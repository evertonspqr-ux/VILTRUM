import Navbar from '@/components/Navbar';
import HeroViltrum from '@/components/HeroViltrum';
import ImperialTicker from '@/components/ImperialTicker';
import ImperialDoctrine from '@/components/ImperialDoctrine';
import CharacterCommand from '@/components/CharacterCommand';
import TimelineViltrum from '@/components/TimelineViltrum';
import ScourgeSection from '@/components/ScourgeSection';
import ConquestDashboard from '@/components/ConquestDashboard';
import RecruitmentViltrum from '@/components/RecruitmentViltrum';
import ManifestoFinal from '@/components/ManifestoFinal';
import FooterViltrum from '@/components/FooterViltrum';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroViltrum />
      <ImperialTicker />
      <ImperialDoctrine />
      <CharacterCommand />
      <TimelineViltrum />
      <ScourgeSection />
      <ConquestDashboard />
      <RecruitmentViltrum />
      <ManifestoFinal />
      <FooterViltrum />
    </main>
  );
}
