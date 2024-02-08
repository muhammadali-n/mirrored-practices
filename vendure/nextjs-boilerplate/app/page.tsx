import { VendureService } from '@/services/vendure.service';
import HomeLayout from '@/layout/HomeLayout';

export default  async function Home() {
  const gqService = new VendureService();
  const response: any = await gqService.fetchCollection();

  return (
    <>
      <HomeLayout response={response} />
    </>
  )
}


