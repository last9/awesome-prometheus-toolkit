export interface Alert {
  group: string;
  components: Component[];
}

export interface Component {
  name: string;
  rules: RuleDetails[];
}

export interface RuleDetails {
  summary: string;
  description: string;
  yml: Rule;
}

export interface Rule {
  alert: string;
  expr: string;
  for: string;
  labels: {
    severity: string;
  };
  annotations: {
    summary: string;
    description: string;
  };
}

export interface MappingRule {
  name: string;
  description: string;
  query: string;
  severity: string;
  for: string;
}

export interface MappingFile {
  groups: Group[];
}

export interface RuleFile {
  groups: {
    name: string;
    rules: Rule[];
  }[];
}

export interface Group {
  name: string;
  services: Service[];
}

export interface Service {
  name: string;
  exporters: Exporter[];
}

export interface Exporter {
  name: string;
  slug: string;
  rules: MappingRule[];
}
export interface ApiError {
  code: number;
  reason: string;
  status: string;
}

export interface UseAlertsResponse {
  data: { alerts: Alert[] };
  status: string;
}

export interface Discovery {
  component: string;
  exists: boolean;
}

export interface RuleGroup {
  name: string;
  file: string;
  rules: PrometheusRule[];
}

export interface PrometheusRule {
  name: string;
  query: string;
  labels: {
    severity: string;
  };
  annotations: {
    summary: string;
    description: string;
  };
}

export interface UseDiscoveryResponse {
  data: { discovered: Discovery[] };
  status: string;
}

export interface UseRulesResponse {
  data: { groups: RuleGroup[] };
  status: string;
}

export interface PrometheusQueryResponse {
  data: {
    result: object[];
    resultType: string;
  };
  isPartial?: boolean;
  status: string;
}

export interface PrometheusQueryProps {
  url: string;
  query: string;
  username?: string | null;
  password?: string | null;
}

export interface PrometheusRulesResponse {
  data: {
    groups: RuleGroup[];
  };
  status: string;
}

export interface GithubResponse {
  stargazers_count: number;
}
