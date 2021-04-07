const Merchant = require("./Merchant");
const ShopTypesList = require("../../../../../../../shops/ShopTypesList");

class PriestMerchant extends Merchant {}

PriestMerchant.prototype.shop = ShopTypesList.Inn;

module.exports = PriestMerchant;