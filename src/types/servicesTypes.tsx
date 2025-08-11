import type { JSX } from "react";

export interface Service {
    id: string;
    title: string;
    icon: JSX.Element;
    shortDescription: string;
    details: {
        description: string;
        features: string[];
        commitment: string;
    };
}