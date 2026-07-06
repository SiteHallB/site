/**
 * Correspondance entre les noms d'icônes du CMS et les composants lucide-react.
 */
import {
    Activity,
    Baby,
    Bike,
    Brain,
    CalendarCheck2,
    Car,
    CheckCheck,
    Clock,
    Dumbbell,
    Flame,
    Globe,
    Heart,
    MapPin,
    Music,
    Phone,
    Smile,
    Sparkles,
    SquareParking,
    Target,
    Timer,
    Users,
    Waves,
    WavesLadder,
    Wind,
    Zap,
} from "lucide-react";

export const CMS_ICONS = {
    Activity,
    Baby,
    Bike,
    Brain,
    CalendarCheck2,
    Car,
    CheckCheck,
    Clock,
    Dumbbell,
    Flame,
    Globe,
    Heart,
    MapPin,
    Music,
    Phone,
    Smile,
    Sparkles,
    SquareParking,
    Target,
    Timer,
    Users,
    Waves,
    WavesLadder,
    Wind,
    Zap,
} as const;

export type CmsIconName = keyof typeof CMS_ICONS;

export function getIcon(name?: string | null): (typeof CMS_ICONS)[CmsIconName] {
    if (name && name in CMS_ICONS) return CMS_ICONS[name as CmsIconName];
    return Sparkles;
}
