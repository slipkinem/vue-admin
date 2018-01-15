/**
 * Created by slipkinem on 12/19/2017 at 4:44 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { ElDialog } from 'element-ui/types/dialog'

export declare interface PaymentDialog extends ElDialog {
  openPayment: (payInfo: any) => void
}
