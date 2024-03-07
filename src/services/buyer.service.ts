import { IBuyerDocument } from '@dtlee2k1/jobber-shared';
import { BuyerModel } from '@users/models/buyer.schema';

export async function getBuyerByEmail(email: string) {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ email }).exec();
  return buyer;
}

export async function getBuyerByUsername(username: string) {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ username }).exec();
  return buyer;
}

export async function getRandomBuyers(count: number) {
  const buyers: IBuyerDocument[] | null = await BuyerModel.aggregate([{ $sample: { size: count } }]);
  return buyers;
}

export async function createBuyer(buyerData: IBuyerDocument) {
  const checkIfBuyerExists: IBuyerDocument | null = await getBuyerByEmail(`${buyerData.email}`);

  if (!checkIfBuyerExists) {
    await BuyerModel.create(buyerData);
  }
}
