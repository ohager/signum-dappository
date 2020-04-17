import { broadcastTransaction } from '@burstjs/core'
import { burstService } from '../__helpers__/burstService'

export const post = async (req, res) => {
    try {
        const { signedTransaction } = req.body
        const { transaction } = await broadcastTransaction(burstService)(signedTransaction)
        return res.end(transaction)
    } catch (e) {
        res.statusCode = 500
        console.log('Error', e)
        return res.end(e.message)
    }
}
