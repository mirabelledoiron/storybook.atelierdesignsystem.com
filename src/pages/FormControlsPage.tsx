import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import InstallBlock from "@/components/InstallBlock";
import DocBlock from "@/components/DocBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function FormControlsPage() {
  return (
    <StorybookLayout>
      <PageHeader title="Form Controls" subtitle="Checkbox, Radio, and Switch components for boolean and single-choice selections." />

      <InstallBlock
        install="npx shadcn-ui@latest add checkbox radio-group switch"
        importCode={`import { Checkbox } from "@/components/ui/checkbox";
          import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
          import { Switch } from "@/components/ui/switch";`}
        usage={`<Checkbox id="terms" />
          <Switch id="notifications" />`}
      />

      <DocBlock
        usage="Choose Checkbox for multiple selections, Radio for single selection from a group, and Switch for immediate on/off settings. Always pair with Label for accessibility."
        doItems={["Use Label with htmlFor for every control", "Group related checkboxes under a shared heading", "Use Switch for settings that take immediate effect"]}
        dontItems={["Don't use Switch when a save/submit action is required — use Checkbox", "Don't use Radio for more than 5-7 options — use Select instead"]}
        apiRows={[
          { prop: "checked", type: "boolean", desc: "Controlled checked state (Checkbox/Switch)" },
          { prop: "defaultChecked", type: "boolean", default: "false", desc: "Initial state for uncontrolled usage" },
          { prop: "onCheckedChange", type: "(checked: boolean) => void", desc: "Callback when value changes" },
          { prop: "disabled", type: "boolean", default: "false", desc: "Prevents interaction" },
          { prop: "value", type: "string", desc: "Value for RadioGroupItem within a RadioGroup" },
          { prop: "defaultValue", type: "string", desc: "Initial selection for RadioGroup" },
        ]}
      />

      {/* Checkbox */}
      <ComponentSection title="Checkbox" description="For multiple selections or boolean toggles.">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="text-muted-foreground">Disabled option</Label>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Checkbox Group" description="Multiple related checkboxes.">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Notifications</Label>
          {["Email", "Push", "SMS", "In-app"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item.toLowerCase()} />
              <Label htmlFor={item.toLowerCase()} className="text-sm font-normal">{item}</Label>
            </div>
          ))}
        </div>
      </ComponentSection>

      {/* Radio */}
      <ComponentSection title="Radio Group" description="For single selection from a set of options.">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="compact" />
            <Label htmlFor="compact">Compact</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="comfortable" />
            <Label htmlFor="comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="spacious" id="spacious" />
            <Label htmlFor="spacious">Spacious</Label>
          </div>
        </RadioGroup>
      </ComponentSection>

      <ComponentSection title="Radio Card Style" description="Radio options as selectable cards.">
        <RadioGroup defaultValue="personal" className="grid grid-cols-3 gap-4 max-w-lg">
          {[
            { value: "personal", label: "Personal", desc: "For individual use" },
            { value: "team", label: "Team", desc: "Up to 10 members" },
            { value: "enterprise", label: "Enterprise", desc: "Unlimited members" },
          ].map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className="flex flex-col items-center gap-1 rounded-xl border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.desc}</span>
            </Label>
          ))}
        </RadioGroup>
      </ComponentSection>

      {/* Switch */}
      <ComponentSection title="Switch" description="Toggle between two states. Use for immediate-effect settings.">
        <div className="space-y-4">
          <div className="flex items-center justify-between max-w-xs">
            <Label htmlFor="dark-mode">Dark mode</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between max-w-xs">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between max-w-xs">
            <Label htmlFor="disabled-switch" className="text-muted-foreground">Disabled</Label>
            <Switch id="disabled-switch" disabled />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="When to Use What" description="Decision guide for form controls.">
        <div className="space-y-2 text-sm">
          {[
            ["Checkbox", "Multiple selections, boolean toggle, terms acceptance"],
            ["Radio", "Single selection from 2-5 options, mutually exclusive"],
            ["Switch", "On/off setting with immediate effect, preferences"],
          ].map(([name, desc]) => (
            <div key={name as string} className="flex gap-3">
              <span className="font-medium text-foreground w-24">{name}</span>
              <span className="text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </ComponentSection>
    </StorybookLayout>
  );
}
