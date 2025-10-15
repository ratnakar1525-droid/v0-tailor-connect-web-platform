export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-pretty">&copy; {new Date().getFullYear()} TailorConnect. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a className="hover:text-foreground" href="/privacy">
            Privacy
          </a>
          <a className="hover:text-foreground" href="/terms">
            Terms
          </a>
          <a className="hover:text-foreground" href="/contact">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
