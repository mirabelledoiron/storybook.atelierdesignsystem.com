import { Link } from "react-router-dom";
import StorybookLayout from "@/components/StorybookLayout";
import {
  ArrowRight, ArrowUpRight, Palette, Type, LayoutGrid, Box, Radius, Move,
  ArrowUpDown, Monitor, Circle, Component, TextCursor, AlignLeft,
  ListFilter, FormInput, ToggleLeft, SlidersHorizontal, CreditCard,
  Sparkles, Users, Table2, Loader, BarChart3, Layers, Navigation,
  ChevronsUpDown, PanelLeft, Terminal, MessageSquare, PanelRightOpen,
  Info, AlertTriangle, GalleryHorizontal, SeparatorHorizontal,
  Eye, Zap, Lightbulb, FileText, GitPullRequest, BookOpen,
  Database, FolderOpen, Layout, MousePointer,
  KeyRound, CalendarDays, Paintbrush, Upload, Star, Clock, GitBranch, Keyboard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const groups = [
  {
    label: "Foundations",
    items: [
      { label: "Colors", path: "/colors", icon: Palette, desc: "Palette & tokens" },
      { label: "Typography", path: "/typography", icon: Type, desc: "Type scale & weights" },
      { label: "Spacing", path: "/spacing", icon: LayoutGrid, desc: "Spacing scale & layout" },
      { label: "Shadows", path: "/shadows", icon: Box, desc: "Elevation & depth" },
      { label: "Border Radius", path: "/border-radius", icon: Radius, desc: "Radius scale" },
      { label: "Motion", path: "/motion", icon: Move, desc: "Timing & easing" },
      { label: "Z-Index", path: "/z-index", icon: ArrowUpDown, desc: "Layer hierarchy" },
      { label: "Breakpoints", path: "/breakpoints", icon: Monitor, desc: "Responsive design" },
      { label: "Icons", path: "/icons", icon: Circle, desc: "Icon library" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Buttons", path: "/buttons", icon: Component, desc: "Actions & states" },
      { label: "Inputs", path: "/inputs", icon: TextCursor, desc: "Text fields" },
      { label: "Textarea", path: "/textarea", icon: AlignLeft, desc: "Multi-line input" },
      { label: "Select", path: "/select", icon: ListFilter, desc: "Dropdowns" },
      { label: "Form Controls", path: "/form-controls", icon: FormInput, desc: "Checkbox, radio, switch" },
      { label: "Toggles", path: "/toggles", icon: ToggleLeft, desc: "Toggle buttons" },
      { label: "Sliders", path: "/sliders", icon: SlidersHorizontal, desc: "Range inputs" },
      { label: "OTP Input", path: "/otp-input", icon: KeyRound, desc: "Verification codes" },
      { label: "Date Picker", path: "/date-picker", icon: CalendarDays, desc: "Calendar selection" },
      { label: "Color Picker", path: "/color-picker", icon: Paintbrush, desc: "Color selection" },
      { label: "File Upload", path: "/file-upload", icon: Upload, desc: "Drag & drop files" },
      { label: "Rating", path: "/rating", icon: Star, desc: "Star ratings" },
      { label: "Cards", path: "/cards", icon: CreditCard, desc: "Content containers" },
      { label: "Badges", path: "/badges", icon: Sparkles, desc: "Labels & tags" },
      { label: "Avatar", path: "/avatar", icon: Users, desc: "User images" },
      { label: "Table", path: "/table", icon: Table2, desc: "Data tables" },
      { label: "Skeleton", path: "/skeletons", icon: Loader, desc: "Loading placeholders" },
      { label: "Progress", path: "/progress", icon: BarChart3, desc: "Progress indicators" },
      { label: "Timeline", path: "/timeline", icon: Clock, desc: "Event histories" },
      { label: "Tree View", path: "/tree-view", icon: GitBranch, desc: "Hierarchical data" },
      { label: "Kbd", path: "/kbd", icon: Keyboard, desc: "Keyboard shortcuts" },
      { label: "Tabs & Accordion", path: "/tabs", icon: Layers, desc: "Content sections" },
      { label: "Breadcrumb", path: "/breadcrumb", icon: Navigation, desc: "Wayfinding" },
      { label: "Pagination", path: "/pagination", icon: ChevronsUpDown, desc: "Page navigation" },
      { label: "Dropdown Menu", path: "/dropdown-menu", icon: PanelLeft, desc: "Action menus" },
      { label: "Command", path: "/command", icon: Terminal, desc: "Command palette" },
      { label: "Dialogs", path: "/dialogs", icon: MessageSquare, desc: "Modals & confirms" },
      { label: "Drawer", path: "/drawer", icon: PanelRightOpen, desc: "Slide-in panels" },
      { label: "Tooltip & Popover", path: "/tooltip-popover", icon: Info, desc: "Floating content" },
      { label: "Alerts & Toasts", path: "/alerts", icon: AlertTriangle, desc: "Notifications" },
      { label: "Collapsible", path: "/collapsible", icon: ChevronsUpDown, desc: "Expandable content" },
      { label: "Carousel", path: "/carousel", icon: GalleryHorizontal, desc: "Slideshows" },
      { label: "Separator", path: "/separator", icon: SeparatorHorizontal, desc: "Dividers" },
    ],
  },
  {
    label: "Patterns",
    items: [
      { label: "Form Patterns", path: "/patterns/forms", icon: FormInput, desc: "Validation & layout" },
      { label: "Layout Patterns", path: "/patterns/layout", icon: Layout, desc: "Page templates" },
      { label: "Content States", path: "/patterns/content", icon: FolderOpen, desc: "Empty, loading, error" },
      { label: "Data Patterns", path: "/patterns/data", icon: Database, desc: "Tables & grids" },
    ],
  },
  {
    label: "Guidelines",
    items: [
      { label: "Accessibility", path: "/accessibility", icon: Eye, desc: "WCAG & focus" },
      { label: "Effects", path: "/effects", icon: Zap, desc: "Glows & shadows" },
      { label: "Design Principles", path: "/guidelines/principles", icon: Lightbulb, desc: "System philosophy" },
      { label: "Content Guidelines", path: "/guidelines/content", icon: FileText, desc: "Voice & tone" },
      { label: "Contributing", path: "/guidelines/contributing", icon: GitPullRequest, desc: "How to contribute" },
      { label: "Tokens", path: "/tokens", icon: BookOpen, desc: "Download tokens" },
    ],
  },
];

const Index = () => {
  return (
    <StorybookLayout>
      <div className="flex flex-col items-center text-center py-16">
        <Badge variant="outline" className="mb-6 font-mono text-xs border-border text-muted-foreground">
          Design System v2.0
        </Badge>
        <h1 className="text-primary text-5xl font-bold tracking-tight mb-2">Atelier</h1>
        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Design System</h2>
        <p className="text-lg text-muted-foreground max-w-lg mb-14">
          Bridging design and engineering so teams ship faster with less friction.
        </p>

        <Button asChild variant="outline" className="font-mono text-xs">
          <a
            href="https://storybook.atelierdesignsystem.com/?path=/docs/components-accordion--docs"
            target="_blank"
            rel="noreferrer"
          >
            Storybook link
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">{group.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 hover:scale-[1.01] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-primary-light group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </StorybookLayout>
  );
};

export default Index;
