
import React from 'react';
import { ConceptNode } from '../types';

interface ConceptMapProps {
  nodes: ConceptNode[];
}

export const ConceptMap: React.FC<ConceptMapProps> = ({ nodes }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
      <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center">
        <i className="fas fa-project-diagram mr-2 text-emerald-500"></i>
        Mapa Cognitivo de Conexões
      </h4>
      <div className="flex flex-col space-y-4">
        {nodes.map((node, idx) => (
          <div key={node.id} className="relative">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm relative z-10 hover:border-emerald-500 transition-all group">
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                  {idx + 1}
                </span>
                <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  {node.label}
                </h5>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium pl-9">
                {node.description}
              </p>
            </div>
            {idx < nodes.length - 1 && (
              <div className="flex justify-center my-1 relative h-8">
                <div className="w-0.5 bg-slate-200 dark:bg-slate-800 h-full"></div>
                {node.connection && (
                  <span className="absolute top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-3 py-1 border border-slate-100 dark:border-slate-800 rounded-full text-[8px] font-black uppercase text-emerald-600 dark:text-emerald-400 shadow-sm">
                    {node.connection}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
