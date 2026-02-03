import { Canvas } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";

export default function FloatingText3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
      <Canvas camera={{ position: [0, 0, 10] }}>

        <ambientLight intensity={1} />

        {/* TAX */}
        <Float speed={1} floatIntensity={1.5}>
          <Text position={[-4, 2, 0]} fontSize={0.9} color="#14b8a6">
            TAX
          </Text>
        </Float>

        {/* AUDIT */}
        <Float speed={1.3} floatIntensity={1.5}>
          <Text position={[3, 1.5, 0]} fontSize={0.9} color="#3b82f6">
            AUDIT
          </Text>
        </Float>

        {/* CONSULTING */}
        <Float speed={1.6} floatIntensity={1.5}>
          <Text position={[0, -2, 0]} fontSize={0.8} color="#06b6d4">
            CONSULTING
          </Text>
        </Float>

        {/* GST */}
        <Float speed={1.2} floatIntensity={1.5}>
          <Text position={[-3, -1, 0]} fontSize={0.8} color="#22c55e">
            GST
          </Text>
        </Float>

        {/* ITR */}
        <Float speed={1.4} floatIntensity={1.5}>
          <Text position={[4, -1, 0]} fontSize={0.8} color="#6366f1">
            ITR
          </Text>
        </Float>

      </Canvas>
    </div>
  );
}
