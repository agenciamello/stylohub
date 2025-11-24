import React from 'react';

// --- Card ---
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div className={`bg-card border border-zinc-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:border-zinc-700 transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h3 className={`text-xl font-semibold text-foreground tracking-tight ${className}`}>{children}</h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pt-3 ${className}`}>{children}</div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'md', className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/90",
    outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100",
    ghost: "hover:bg-zinc-800 text-zinc-300 hover:text-white",
    gold: "bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 hover:from-amber-500 hover:to-amber-700 shadow-lg shadow-amber-500/20",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; className?: string; variant?: 'default' | 'gold' }> = ({ children, className = "", variant = 'default' }) => {
  const styles = variant === 'gold' 
    ? "bg-amber-500/10 text-amber-400 border-amber-500/20 border" 
    : "bg-zinc-800 text-zinc-300 border-zinc-700 border";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${styles} ${className}`}>
      {children}
    </span>
  );
};

// --- Progress Bar ---
export const ProgressBar: React.FC<{ value: number; max?: number; className?: string }> = ({ value, max = 100, className = "" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-zinc-800 ${className}`}>
      <div
        className="h-full bg-amber-500 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// --- Input ---
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = "", ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400">{label}</label>}
    <input
      className={`flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white ${className}`}
      {...props}
    />
  </div>
);