import { AlertComponent } from "@/components/AlertComponent";
import { Alert } from "@/lib/types";

export const AlertGroup = ({ group, components }: Alert) => {
  return (
    <div className="flex flex-col">
      <p className="pb-4 text-[10px] font-bold text-slate-400">{group.toUpperCase()}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {components.map((component, index) => (
          <AlertComponent
            key={`${component.name}-${index}`}
            name={component.name}
            rules={component.rules}
          />
        ))}
      </div>
    </div>
  );
};
