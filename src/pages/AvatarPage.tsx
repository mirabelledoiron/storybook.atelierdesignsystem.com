import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import InstallBlock from "@/components/InstallBlock";
import DocBlock from "@/components/DocBlock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { name: "Alice Chen", initials: "AC", img: "https://api.dicebear.com/7.x/initials/svg?seed=AC" },
  { name: "Bob Smith", initials: "BS", img: "https://api.dicebear.com/7.x/initials/svg?seed=BS" },
  { name: "Carol Wu", initials: "CW", img: "https://api.dicebear.com/7.x/initials/svg?seed=CW" },
  { name: "Dan Lee", initials: "DL", img: "https://api.dicebear.com/7.x/initials/svg?seed=DL" },
  { name: "Eve Patel", initials: "EP", img: "https://api.dicebear.com/7.x/initials/svg?seed=EP" },
];

export default function AvatarPage() {
  return (
    <StorybookLayout>
      <PageHeader title="Avatar" subtitle="User profile images with fallback initials. Supports sizes, groups, and status indicators." />

      <InstallBlock
        install="npx shadcn-ui@latest add avatar"
        importCode={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";`}
        usage={`<Avatar>
  <AvatarImage src="/avatar.png" />
  <AvatarFallback>AC</AvatarFallback>
</Avatar>`}
      />

      <DocBlock
        usage="Use Avatar to represent users. Always provide a fallback with initials in case the image fails to load."
        doItems={["Include alt text on AvatarImage", "Use initials as fallback", "Keep fallback to 2 characters"]}
        dontItems={["Don't use without fallback", "Don't use for non-user images (use Image instead)"]}
        apiRows={[
          { prop: "AvatarImage", type: "component", desc: "User image with src and alt attributes" },
          { prop: "AvatarFallback", type: "component", desc: "Fallback content (initials) shown when image fails" },
          { prop: "className", type: "string", desc: "Size classes (e.g., 'w-10 h-10') applied to Avatar root" },
        ]}
      />

      <ComponentSection title="Sizes" description="Scale avatars for different contexts.">
        <div className="flex items-end gap-4">
          {[
            { size: "w-6 h-6", label: "xs", text: "text-[8px]" },
            { size: "w-8 h-8", label: "sm", text: "text-[10px]" },
            { size: "w-10 h-10", label: "md", text: "text-xs" },
            { size: "w-12 h-12", label: "lg", text: "text-sm" },
            { size: "w-16 h-16", label: "xl", text: "text-base" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Avatar className={s.size}>
                <AvatarImage src={users[0].img} />
                <AvatarFallback className={s.text}>{users[0].initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-mono text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Fallback" description="When no image is available, initials are shown.">
        <div className="flex gap-3">
          {users.map((u) => (
            <Avatar key={u.name}>
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{u.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Avatar Group" description="Overlapping avatars for teams or collaborators.">
        <div className="flex -space-x-3">
          {users.map((u) => (
            <Avatar key={u.name} className="border-2 border-background">
              <AvatarImage src={u.img} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{u.initials}</AvatarFallback>
            </Avatar>
          ))}
          <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">+3</span>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="With Status" description="Online/offline indicator.">
        <div className="flex gap-4">
          {[
            { color: "bg-secondary", label: "Online" },
            { color: "bg-primary", label: "Away" },
            { color: "bg-muted-foreground", label: "Offline" },
          ].map((status) => (
            <div key={status.label} className="flex flex-col items-center gap-1.5">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">AC</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${status.color} border-2 border-background`} />
              </div>
              <span className="text-xs text-muted-foreground">{status.label}</span>
            </div>
          ))}
        </div>
      </ComponentSection>
    </StorybookLayout>
  );
}
