import axios from 'axios';
export class PriceFeed {
    protected endpoint = 'https://api.coingecko.com/api/v3/simple/price';
    async getPriceList(tokens?: string[]): Promise<any> {
        try {
            const rate = await fetch(`${this.endpoint}?ids=solana&vs_currencies=usd`);
            return rate;
        } catch (error) {
            throw 'fail to fetch price feed'
        }
    }

}