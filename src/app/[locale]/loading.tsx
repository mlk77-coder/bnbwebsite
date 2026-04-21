import { LetterPullup } from '@/components/letter-pullup';
import PageWrapper from '@/components/page-wrapper';
import Image from 'next/image';

const Loading = () => {
  return (
    <PageWrapper className='mx-auto flex max-w-screen-md flex-col items-center justify-center'>
      <Image src='/logo-light.png' width={300} height={300} alt='logo' />
      <LetterPullup
        words='BNB Store'
        className='text-primary font-serif text-6xl'
      />
    </PageWrapper>
  );
};

export default Loading;
