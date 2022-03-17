import { getSaving } from './getSaving';

export async function parseSavings(item, db) {
  const savingId = item.savingId;
  const savingFee = item.fee;
  const saving = await getSaving(savingId, db);

  return {
    ...saving,
    fee: savingFee,
  };
}
