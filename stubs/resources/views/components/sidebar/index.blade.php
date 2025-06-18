<div x-data="sidebar">
    {{ $slot }}
</div>

{{-- <Sidebar>
    <SidebarHeader />
    <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
</Sidebar> --}}

@pushLumenScriptsOnce
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('sidebar', () => ({
        // @var {"expanded" | "collapsed"}
        state: 'expanded',

        // @var {bool}
        open: false,

        // @var {bool}
        openMobile: false,

        toggleSidebar() {
            this.state = this.state === 'expanded' ? 'collapsed' : 'expanded';
        },
    }))
});
</script>
@endPushLumenScriptsOnce

@pushLumenStylesOnce
<style>
    @layer base {
        :root {
            --sidebar: oklch(0.985 0 0);
            --sidebar-foreground: oklch(0.145 0 0);
            --sidebar-primary: oklch(0.205 0 0);
            --sidebar-primary-foreground: oklch(0.985 0 0);
            --sidebar-accent: oklch(0.97 0 0);
            --sidebar-accent-foreground: oklch(0.205 0 0);
            --sidebar-border: oklch(0.922 0 0);
            --sidebar-ring: oklch(0.708 0 0);
        }
        
        .dark {
            --sidebar: oklch(0.205 0 0);
            --sidebar-foreground: oklch(0.985 0 0);
            --sidebar-primary: oklch(0.488 0.243 264.376);
            --sidebar-primary-foreground: oklch(0.985 0 0);
            --sidebar-accent: oklch(0.269 0 0);
            --sidebar-accent-foreground: oklch(0.985 0 0);
            --sidebar-border: oklch(1 0 0 / 10%);
            --sidebar-ring: oklch(0.439 0 0);
        }
    }
</style>
@endPushLumenStylesOnce
