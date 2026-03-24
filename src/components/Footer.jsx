import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t-2 border-border bg-card py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black font-display tracking-tight">ABDUL.DEV</h2>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            © {currentYear} Abdul Rehman. All rights reserved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-sm font-bold">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-secondary transition-colors">
            GITHUB <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-secondary transition-colors">
            LINKEDIN <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-secondary transition-colors">
            TWITTER <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
