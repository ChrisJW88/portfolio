export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-white/10 px-5 py-8">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="space-y-1">
          <p className="text-sm text-textSecondary">
            <a href="mailto:chrisjameswilson1988@gmail.com" className="hover:text-white transition-colors">
              chrisjameswilson1988@gmail.com
            </a>
          </p>
          <p className="text-xs text-textMuted">ABN: 99735909267</p>
        </div>
        <p className="text-xs text-textMuted">© {new Date().getFullYear()} Chris Wilson. All rights reserved.</p>
      </div>
    </footer>
  );
}

