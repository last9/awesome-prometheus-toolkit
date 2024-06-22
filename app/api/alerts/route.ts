import { NextResponse } from "next/server";
import yaml from "js-yaml";
import { Alert, MappingFile, RuleFile } from "@/lib/types";

const FILE_BASE = "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master";

// To fetch yml file from a given url
async function fetchYml(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw 404;
  }

  return await response.text();
}

// Refactoring data to serve it on the frontend
export async function GET() {
  try {
    const mappingYaml: string = await fetchYml(`${FILE_BASE}/_data/rules.yml`);
    const mappings = yaml.load(mappingYaml) as MappingFile;

    const alerts: Alert[] = await Promise.all(
      mappings.groups.map(async (group) => {
        const components = await Promise.all(
          group.services.map(async (service) => {
            const name = service.name.replaceAll(" ", "-").toLowerCase().trim();

            return await Promise.all(
              service.exporters.flatMap(async (exporter) => {
                const ruleYml = await fetchYml(
                  `${FILE_BASE}/dist/rules/${name}/${exporter.slug}.yml`,
                );

                const ruleJson = yaml.load(ruleYml) as RuleFile;

                const rules = ruleJson.groups
                  .flatMap((group) => group.rules)
                  .filter((rule) => rule !== null)
                  .map((rule, index) => ({
                    summary: exporter.rules[index].name,
                    description: exporter.rules[index].description,
                    yml: rule,
                  }));

                return {
                  name:
                    service.exporters.length > 1
                      ? `${service.name} (${exporter.name})`
                      : service.name,
                  rules,
                };
              }),
            );
          }),
        );

        return {
          group: group.name,
          components: components.flat(),
        };
      }),
    );

    return NextResponse.json({
      status: "success",
      data: { alerts },
    });
  } catch (error) {
    let code;
    let reason;

    if (typeof error !== "number") {
      code = 500;
    } else {
      code = error;
    }

    if (code === 404) {
      reason = "Failed to fetch repository contents";
    } else if (code === 500) {
      reason = "Something went wrong. Please try again later.";
    }

    return NextResponse.json(
      {
        code,
        reason,
        status: "error",
      },
      { status: code },
    );
  }
}
