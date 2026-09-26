import React, { useState } from "react";
import { projects, ProjectItem } from "../data/projects";
import { Maximize2, X } from "lucide-react";

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "climatizacion", label: "Climatización" },
    { id: "electricidad", label: "Electricidad" },
    { id: "fontaneria", label: "Fontanería" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-20 bg-[#f5f6fa]/60 border-t border-[#e5e7eb] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Portfolio de instalaciones
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            Nuestros trabajos
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Una selección visual de trabajos e instalaciones realizados por Instalaciones AXA.
          </p>
        </div>

        {/* Functional category filter tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#0B116B] text-white shadow-xs"
                    : "text-[#626779] hover:text-[#15182b] hover:bg-[#f5f6fa]"
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#f2f4ff] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(project)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  title="Ampliar imagen"
                  aria-label={`Ampliar imagen de ${project.title}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#0B116B]">
                  {project.location}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#15182b] tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#626779] mt-1">
                    {project.scope}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f5f6fa] flex items-center justify-between text-xs text-[#626779]">
                  <span className="capitalize font-medium text-[#0B116B]">
                    {project.category}
                  </span>
                  <span>Tarragona</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full image preview */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#15182b] flex items-center justify-center hover:bg-white shadow-md cursor-pointer"
                  aria-label="Cerrar vista previa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 bg-white flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#15182b]">
                    {selectedImage.title}
                  </h4>
                  <p className="text-sm text-[#626779]">
                    {selectedImage.scope} · {selectedImage.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0B116B] rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
