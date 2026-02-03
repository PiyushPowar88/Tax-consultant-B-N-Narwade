import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} />

        {/* Floating Sphere 1 */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.6, 32, 32]} position={[-2, 1, 0]}>
            <meshStandardMaterial color="#14b8a6" />
          </Sphere>
        </Float>

        {/* Floating Sphere 2 */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.5, 32, 32]} position={[2, -1, 0]}>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
        </Float>

        {/* Floating Sphere 3 */}
        <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere args={[0.4, 32, 32]} position={[0, 2, -1]}>
            <meshStandardMaterial color="#06b6d4" />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
