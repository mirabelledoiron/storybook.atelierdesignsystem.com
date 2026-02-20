import { Link, useLocation } from "react-router-dom";
import {
  Palette, Type, ToggleLeft, CreditCard, MessageSquare, Layers,
  ChevronRight, Sparkles, TextCursor, AlertTriangle, SlidersHorizontal,
  Loader, LayoutGrid, Zap, Eye, Component, Sun, Moon,
  Box, Radius, Move, ArrowUpDown, Monitor, Circle, Image,
  AlignLeft, ListFilter, Table2, Users, BarChart3,
  Navigation, ChevronsUpDown, Terminal, PanelRightOpen,
  Info, PanelLeft, GalleryHorizontal, SeparatorHorizontal,
  FileText, BookOpen, Lightbulb, GitPullRequest, FormInput,
  Layout, FolderOpen, Database, MousePointer, ChevronDown,
  KeyRound, CalendarDays, Paintbrush, Upload, Star, Clock, GitBranch, Keyboard, Menu,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  {
    label: "Getting Started",
    items: [
      { name: "Get Started", path: "/get-started", icon: BookOpen },
    ],
  },
  {
    label: "Foundations",
    items: [
      { name: "Colors", path: "/colors", icon: Palette },
      { name: "Typography", path: "/typography", icon: Type },
      { name: "Spacing", path: "/spacing", icon: LayoutGrid },
      { name: "Shadows & Elevation", path: "/shadows", icon: Box },
      { name: "Border Radius", path: "/border-radius", icon: Radius },
      { name: "Motion & Animation", path: "/motion", icon: Move },
      { name: "Z-Index", path: "/z-index", icon: ArrowUpDown },
      { name: "Breakpoints", path: "/breakpoints", icon: Monitor },
      { name: "Icons", path: "/icons", icon: Circle },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Buttons", path: "/buttons", icon: Component },
      { name: "Inputs", path: "/inputs", icon: TextCursor },
      { name: "Textarea", path: "/textarea", icon: AlignLeft },
      { name: "Select", path: "/select", icon: ListFilter },
      { name: "Form Controls", path: "/form-controls", icon: FormInput },
      { name: "Toggle & Switch", path: "/toggles", icon: ToggleLeft },
      { name: "Sliders", path: "/sliders", icon: SlidersHorizontal },
      { name: "OTP Input", path: "/otp-input", icon: KeyRound },
      { name: "Date Picker", path: "/date-picker", icon: CalendarDays },
      { name: "Color Picker", path: "/color-picker", icon: Paintbrush },
      { name: "File Upload", path: "/file-upload", icon: Upload },
      { name: "Rating", path: "/rating", icon: Star },
      { name: "Cards", path: "/cards", icon: CreditCard },
      { name: "Badges", path: "/badges", icon: Sparkles },
      { name: "Avatar", path: "/avatar", icon: Users },
      { name: "Table", path: "/table", icon: Table2 },
      { name: "Skeleton", path: "/skeletons", icon: Loader },
      { name: "Progress", path: "/progress", icon: BarChart3 },
      { name: "Timeline", path: "/timeline", icon: Clock },
      { name: "Tree View", path: "/tree-view", icon: GitBranch },
      { name: "Kbd", path: "/kbd", icon: Keyboard },
      { name: "Tabs & Accordion", path: "/tabs", icon: Layers },
      { name: "Breadcrumb", path: "/breadcrumb", icon: Navigation },
      { name: "Pagination", path: "/pagination", icon: ChevronsUpDown },
      { name: "Dropdown Menu", path: "/dropdown-menu", icon: PanelLeft },
      { name: "Command Palette", path: "/command", icon: Terminal },
      { name: "Dialogs", path: "/dialogs", icon: MessageSquare },
      { name: "Drawer / Sheet", path: "/drawer", icon: PanelRightOpen },
      { name: "Tooltip & Popover", path: "/tooltip-popover", icon: Info },
      { name: "Alerts & Toasts", path: "/alerts", icon: AlertTriangle },
      { name: "Collapsible", path: "/collapsible", icon: ChevronsUpDown },
      { name: "Carousel", path: "/carousel", icon: GalleryHorizontal },
      { name: "Separator", path: "/separator", icon: SeparatorHorizontal },
    ],
  },
  {
    label: "Patterns",
    items: [
      { name: "Form Patterns", path: "/patterns/forms", icon: FormInput },
      { name: "Layout Patterns", path: "/patterns/layout", icon: Layout },
      { name: "Content States", path: "/patterns/content", icon: FolderOpen },
      { name: "Data Patterns", path: "/patterns/data", icon: Database },
    ],
  },
  {
    label: "Guidelines",
    items: [
      { name: "Accessibility", path: "/accessibility", icon: Eye },
      { name: "Effects", path: "/effects", icon: Zap },
      { name: "Design Principles", path: "/guidelines/principles", icon: Lightbulb },
      { name: "Content Guidelines", path: "/guidelines/content", icon: FileText },
      { name: "Contributing", path: "/guidelines/contributing", icon: GitPullRequest },
      { name: "Tokens", path: "/tokens", icon: BookOpen },
    ],
  },
];

export default function StorybookLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const NavItems = ({
    collapsed,
    wrapWithSheetClose,
    onNavigate,
  }: {
    collapsed?: boolean;
    wrapWithSheetClose?: boolean;
    onNavigate?: () => void;
  }) => (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
      {categories.map((cat) => {
        const hasCurrent = cat.items.some((i) => location.pathname === i.path);
        return (
          <Collapsible key={cat.label} defaultOpen={hasCurrent}>
            {!collapsed ? (
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2 mb-1 group cursor-pointer">
                <span className="text-[11px] font-mono uppercase tracking-widest text-subtle">{cat.label}</span>
                <ChevronDown className="w-3 h-3 text-subtle transition-transform group-data-[state=closed]:-rotate-90" />
              </CollapsibleTrigger>
            ) : null}
            <CollapsibleContent>
              <div className="space-y-0.5">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  const linkEl = (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onNavigate}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-all ${
                        active
                          ? "bg-accent text-primary font-medium"
                          : "text-sidebar-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  );

                  return wrapWithSheetClose ? (
                    <SheetClose key={item.path} asChild>
                      {linkEl}
                    </SheetClose>
                  ) : (
                    linkEl
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen md:flex">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex sticky top-0 h-screen border-r border-border bg-sidebar flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-sidebar-foreground font-bold text-lg tracking-tight">Atelier</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
            <span className="sr-only">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
          </button>
        </div>

        <NavItems collapsed={collapsed} />

        <div className="px-4 py-3 border-t border-border space-y-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-sidebar-foreground hover:bg-accent hover:text-foreground transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
            {!collapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          {!collapsed && <span className="text-xs font-mono text-subtle px-2.5 block">v2.0</span>}
        </div>
      </aside>

      <main className="flex-1">
        {/* Mobile top bar + hamburger */}
        {isMobile && (
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur px-4 py-3">
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <Link to="/" className="text-foreground font-bold tracking-tight">
                Atelier
              </Link>
              <div className="ml-auto" />
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </header>

            <SheetContent side="left" className="p-0 bg-sidebar">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
                  <Link to="/" className="flex items-center gap-2.5">
                    <span className="text-sidebar-foreground font-bold text-lg tracking-tight">Atelier</span>
                  </Link>
                </div>

                <NavItems
                  wrapWithSheetClose
                  onNavigate={() => setMobileNavOpen(false)}
                />

                <div className="px-4 py-3 border-t border-border space-y-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-sidebar-foreground hover:bg-accent hover:text-foreground transition-all"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
                    <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                  </button>
                  <span className="text-xs font-mono text-subtle px-2.5 block">v2.0</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
