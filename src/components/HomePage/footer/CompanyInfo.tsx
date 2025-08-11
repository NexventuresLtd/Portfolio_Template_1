import React from "react";
import { Building2 } from "lucide-react";
import type { CompanyInfoProps } from "../../../types";

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyName, tagline }) => {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center mb-6">
        <Building2 className="w-8 h-8 text-white mr-3" />
        <span className="text-xl font-bold text-slate-200">{companyName}</span>
      </div>
      <p className="text-slate-100 mb-6 leading-relaxed">{tagline}</p>
    </div>
  );
};

export default CompanyInfo;
