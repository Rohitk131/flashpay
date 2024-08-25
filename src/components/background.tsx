import FlickeringGrid from "@/components/ui/flickering-grid-rounded-demo";

export default function FlickeringGridDemo() {
  return (
    <div className="relative h-[500px]  w-full bg-background overflow-hidden border">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full w-full"
        squareSize={6}
        gridGap={10}
        color="#6B7280"
        maxOpacity={0.4}
        flickerChance={0.2}
        height={800}
        
      />
    </div>
  );
}
