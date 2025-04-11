'use client';
import { useState, useEffect } from "react";
import {
  Undo2,
  Redo2,
  Trash2,
  Type,
  Pencil,
  Circle,
  Brush,
  RotateCcw,
  Copy,
} from "lucide-react";

type Material = {
  src: string;
  x: number;
  y: number;
  rotation: number;
  type: string; // Nouveau champ pour spécifier le type (texte, forme, etc.)
  textContent?: string; // Contenu du texte si le type est "text"
};

export default function Home() {
  const [color, setColor] = useState<string>("#cccccc");
  const [size, setSize] = useState<number>(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [placedMaterials, setPlacedMaterials] = useState<Material[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // L'index de l'élément sélectionné
  const [newText, setNewText] = useState<string>(''); // Contenu du texte pour l'outil texte

  const tools = [
    { icon: <Undo2 />, title: "Undo" },
    { icon: <Redo2 />, title: "Redo" },
    { icon: <Trash2 />, title: "Delete" },
    { icon: <Type />, title: "Text" },
    { icon: <Pencil />, title: "Pencil" },
    { icon: <Circle />, title: "Circle" },
    { icon: <Brush />, title: "Freehand" },
    { icon: <RotateCcw />, title: "Rotate" },
    { icon: <Copy />, title: "Duplicate" },
  ];

  const sections = [
    "Terrains",
    "Matériaux",
    "Autres Matériaux",
    "Coach",
    "Gardiens",
    "Joueurs",
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // Fonction pour supprimer un matériau
  const handleDelete = () => {
    if (selectedIndex !== null) {
      setPlacedMaterials((prev) => {
        const updated = prev.filter((_, idx) => idx !== selectedIndex);
        return updated;
      });
      setSelectedIndex(null);
    }
  };

  // Fonction pour faire pivoter un matériau
  const handleRotate = () => {
    if (selectedIndex !== null) {
      setPlacedMaterials((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = {
          ...updated[selectedIndex],
          rotation: (updated[selectedIndex].rotation + 90) % 360,
        };
        return updated;
      });
    }
  };

  // Fonction pour dupliquer un matériau
  const handleDuplicate = () => {
    if (selectedIndex !== null) {
      setPlacedMaterials((prev) => {
        const itemToDuplicate = prev[selectedIndex];
        const updated = [...prev];
        updated.push({ ...itemToDuplicate, x: itemToDuplicate.x + 10, y: itemToDuplicate.y + 10 });
        return updated;
      });
    }
  };

  // Fonction pour ajouter un texte
  const handleTextTool = () => {
    if (newText.trim() === '') return; // Empêche d'ajouter un texte vide
    setPlacedMaterials((prev) => {
      const newMaterial: Material = {
        src: '',
        x: 100, // Position par défaut
        y: 100, // Position par défaut
        rotation: 0,
        type: 'text',
        textContent: newText,
      };
      return [...prev, newMaterial];
    });
    setNewText(''); // Réinitialise le champ de texte après ajout
  };

  // Fonction pour dessiner une forme
  const handleShapeTool = (shapeType: string) => {
    setPlacedMaterials((prev) => {
      const newMaterial: Material = {
        src: '',
        x: 200, // Position par défaut
        y: 200, // Position par défaut
        rotation: 0,
        type: shapeType,
      };
      return [...prev, newMaterial];
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingIndex !== null) {
        const container = document.querySelector("#terrain-container");
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;

        setPlacedMaterials((prev) => {
          const updated = [...prev];
          updated[draggingIndex] = { ...updated[draggingIndex], x, y };
          return updated;
        });
      }
    };

    const handleMouseUp = () => {
      setDraggingIndex(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIndex, dragOffset]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <div className="bg-red-500 text-white font-bold text-lg p-4">
          Création du visuel
        </div>
        <div className="p-2">
          {sections.map((title, index) => (
            <details key={index} className="mb-1">
              <summary className="cursor-pointer p-2 hover:bg-gray-200 rounded">
                {title}
              </summary>
              <div className="pl-4 text-sm text-gray-600">
                {title === "Terrains" && (
                  <>
                    {[ "default-terrain.png", "terrain-beach.png" ].map((file, idx) => {
                      const url = `https://classic.mycoachfootball.com/images/visual-editor/materials/football/pitches/png/${file}`;
                      return (
                        <div className="mb-2" key={idx}>
                          <img
                            src={url}
                            alt={file}
                            className="w-[200px] h-auto rounded cursor-pointer"
                            onClick={() => handleImageClick(url)}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
                {title === "Matériaux" && (
                  <>
                    {[ "/images/m1.png", "/images/m2.png", "/images/m3.png" ].map((src, idx) => (
                      <div key={idx} className="mb-2 inline-block mr-2">
                        <img
                          src={src}
                          alt={`Matériau ${idx + 1}`}
                          className="w-[30px] h-auto rounded cursor-pointer"
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("imageSrc", src)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-4 border-b px-4 py-3 bg-white shadow-sm">
          {tools.map((tool, index) => (
            <div
              key={index}
              title={tool.title}
              className="cursor-pointer hover:text-orange-500"
              onClick={() => {
                switch (tool.title) {
                  case "Delete":
                    handleDelete();
                    break;
                  case "Rotate":
                    handleRotate();
                    break;
                  case "Duplicate":
                    handleDuplicate();
                    break;
                  case "Text":
                    setSelectedTool("Text");
                    break;
                  case "Pencil":
                    setSelectedTool("Pencil");
                    break;
                  case "Circle":
                    handleShapeTool("circle");
                    break;
                  case "Freehand":
                    setSelectedTool("Freehand");
                    break;
                  default:
                    break;
                }
              }}
            >
              {tool.icon}
            </div>
          ))}

          {/* Color and Size Controls */}
          <div className="flex items-center gap-2 ml-4">
            <label className="text-sm">Couleur</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <label className="text-sm">Taille</label>
            <input
              type="range"
              min="1"
              max="30"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Canvas */}
        <div className="p-6">
          <div className="bg-white p-4 shadow-lg rounded border inline-block relative">
            <div
              id="terrain-container"
              className="relative w-[900px] h-auto rounded"
              onDrop={(e) => {
                e.preventDefault();
                const imageSrc = e.dataTransfer.getData("imageSrc");
                if (!imageSrc) return;

                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const newMaterial = { src: imageSrc, x, y, rotation: 0, type: "image" };
                
                setPlacedMaterials((prev) => {
                  const updated = [...prev, newMaterial];
                  setSelectedIndex(updated.length - 1);
                  return updated;
                });
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={selectedImage || "https://classic.mycoachfootball.com/images/visual-editor/materials/football/pitches/png/default-terrain.png"}
                alt="Terrain"
                className="w-[900px] h-auto rounded"
              />

              {placedMaterials.map((item, idx) => (
                <div key={idx} style={{
                  position: 'absolute', top: item.y, left: item.x, transform: `rotate(${item.rotation}deg)`
                }}>
                  {item.type === "image" && (
                    <img
                      src={item.src}
                      className={`w-8 h-8 cursor-move ${selectedIndex === idx ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setSelectedIndex(idx)}
                      onMouseDown={(e) => {
                        setDraggingIndex(idx);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDragOffset({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                    />
                  )}
                  {item.type === "text" && (
                    <div
                      className={`text-sm ${selectedIndex === idx ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setSelectedIndex(idx)}
                    >
                      {item.textContent}
                    </div>
                  )}
                  {item.type === "circle" && (
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: "50%", backgroundColor: color,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Text */}
        {selectedTool === "Text" && (
          <div className="p-4">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter text"
              className="border p-2 w-full"
            />
            <button
              onClick={handleTextTool}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add Text
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
