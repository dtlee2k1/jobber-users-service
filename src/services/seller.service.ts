import mongoose from 'mongoose';
import { ISellerDocument } from '@dtlee2k1/jobber-shared';
import { SellerModel } from '@users/models/seller.schema';
import { updateBuyerIsSellerProp } from '@users/services/buyer.service';

export async function getSellerById(sellerId: string) {
  const seller: ISellerDocument | null = await SellerModel.findOne({ _id: new mongoose.Types.ObjectId(sellerId) }).exec();
  return seller;
}

export async function getSellerByEmail(email: string) {
  const seller: ISellerDocument | null = await SellerModel.findOne({ email }).exec();
  return seller;
}

export async function getSellerByUsername(username: string) {
  const seller: ISellerDocument | null = await SellerModel.findOne({ username }).exec();
  return seller;
}

export async function getRandomSellers(size: number) {
  const seller: ISellerDocument[] | null = await SellerModel.aggregate([{ $sample: { size } }]);
  return seller;
}

export async function createSeller(sellerData: ISellerDocument) {
  const createdSeller: ISellerDocument = await SellerModel.create(sellerData);

  await updateBuyerIsSellerProp(`${createdSeller.email}`);

  return createdSeller;
}
