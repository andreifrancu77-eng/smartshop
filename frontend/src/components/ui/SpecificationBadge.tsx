"use client";

import {
  Cpu,
  HardDrive,
  Battery,
  Camera,
  Monitor,
  Wifi,
  Smartphone,
  LucideIcon,
} from "lucide-react";

type SpecType =
  | "processor"
  | "ram"
  | "storage"
  | "battery"
  | "camera"
  | "screen"
  | "connectivity"
  | "os"
  | "weight"
  | "color"
  | "resolution";

interface SpecificationBadgeProps {
  type: SpecType;
  value: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

const specIcons: Record<SpecType, LucideIcon> = {
  processor: Cpu,
  ram: HardDrive,
  storage: HardDrive,
  battery: Battery,
  camera: Camera,
  screen: Monitor,
  connectivity: Wifi,
  os: Smartphone,
  weight: Monitor,
  color: Monitor,
  resolution: Monitor,
};

const specLabels: Record<SpecType, string> = {
  processor: "Procesor",
  ram: "RAM",
  storage: "Stocare",
  battery: "Baterie",
  camera: "Camera",
  screen: "Ecran",
  connectivity: "Conectivitate",
  os: "Sistem",
  weight: "Greutate",
  color: "Culoare",
  resolution: "Rezolutie",
};

export default function SpecificationBadge({
  type,
  value,
  label,
  size = "md",
  variant = "default",
}: SpecificationBadgeProps) {
  const Icon = specIcons[type];
  const displayLabel = label || specLabels[type];

  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-2",
    lg: "text-base px-4 py-2 gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    default: "bg-slate-100 text-slate-700",
    outline: "border border-slate-200 text-slate-700 bg-white",
    filled: "bg-blue-100 text-blue-700",
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg font-medium ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <Icon className={`${iconSizes[size]} flex-shrink-0`} />
      <span>{value}</span>
    </div>
  );
}

// Compound component for specification list display
interface SpecificationItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function SpecificationItem({ icon: Icon, label, value }: SpecificationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

// Grid component for displaying multiple specifications
interface SpecificationGridProps {
  specifications: {
    type: SpecType;
    value: string;
    label?: string;
  }[];
  columns?: 1 | 2 | 3;
}

export function SpecificationGrid({ specifications, columns = 2 }: SpecificationGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {specifications.map((spec, index) => {
        const Icon = specIcons[spec.type];
        const label = spec.label || specLabels[spec.type];

        return (
          <SpecificationItem
            key={index}
            icon={Icon}
            label={label}
            value={spec.value}
          />
        );
      })}
    </div>
  );
}

// Inline badges for compact display
interface SpecificationBadgesProps {
  specifications: {
    type: SpecType;
    value: string;
  }[];
  size?: "sm" | "md";
}

export function SpecificationBadges({ specifications, size = "sm" }: SpecificationBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {specifications.map((spec, index) => (
        <SpecificationBadge
          key={index}
          type={spec.type}
          value={spec.value}
          size={size}
        />
      ))}
    </div>
  );
}
