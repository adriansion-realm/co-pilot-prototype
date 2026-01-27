import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen" style={{ background: '#FCFAF8' }}>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold text-[#0a0a0a]">Co-Pilot Variants</h1>
        <div className="flex gap-4">
          <Link href="/variant-1">
            <Button className="bg-[#0f4331] hover:bg-[#0a3426] text-white rounded-xl px-8 py-6 text-lg">
              Variant 1
            </Button>
          </Link>
          <Link href="/variant-2">
            <Button className="bg-[#0f4331] hover:bg-[#0a3426] text-white rounded-xl px-8 py-6 text-lg">
              Variant 2
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
