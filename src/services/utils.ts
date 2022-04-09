import axios from 'axios';
export class Utils {
    protected endpoint = 'https://api.coingecko.com/api/v3/simple/price';
    async getPriceList(tokens?: string[]): Promise<any> {
        try {
            const rate = await fetch(`${this.endpoint}?ids=solana&vs_currencies=usd`);
            return rate;
        } catch (error) {
            throw 'fail to fetch price feed'
        }
    }
    public getStakeAccountsByOwner = async (endpoint: string, publicKey: any) => {
        var raw = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getProgramAccounts",
            "params": [
                "Stake11111111111111111111111111111111111111",

                {
                    "encoding": "jsonParsed",
                    "filters": [
                        {
                            "memcmp": {
                                "offset": 12,
                                "bytes": publicKey
                            }
                        }
                    ]
                }
            ]
        }
        return await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(raw)
        })
    }
}