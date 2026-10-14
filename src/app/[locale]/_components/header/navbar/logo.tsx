import { Link } from '@/navigation';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link
      className='inline-flex h-8 shrink-0 items-center lg:h-10'
      href='/'
      title={`Welcome to BNB Store`}
    >
      <Image
        src='/logo-light.png'
        alt={`BNB Store logo`}
        priority
        width={200}
        height={56}
        className='object-start h-8 max-w-[min(200px,42vw)] object-contain lg:h-10'
        style={{ width: 'auto' }}
      />
    </Link>
  );
};

export default Logo;
