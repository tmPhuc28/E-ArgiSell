import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

const THUMBUP_ICON = `
  <?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M895 1986 c-111 -27 -223 -113 -277 -212 -48 -90 -58 -149 -58 -364
l0 -197 -25 -13 c-13 -7 -32 -29 -41 -48 -22 -47 -13 -98 26 -137 26 -25 38
-30 80 -30 43 0 54 5 82 33 29 28 33 39 33 83 0 46 -4 54 -38 86 l-38 35 3
211 c3 208 4 213 31 272 36 78 104 146 181 182 52 24 74 28 146 28 72 0 94 -4
145 -28 78 -36 146 -104 182 -181 28 -60 28 -64 31 -276 l3 -216 -25 -13 c-62
-34 -71 -131 -16 -186 26 -25 38 -30 80 -30 43 0 54 5 82 33 29 28 33 39 33
83 0 46 -4 54 -37 85 l-38 34 0 193 c0 141 -4 209 -15 252 -62 236 -296 378
-530 321z m-265 -861 c26 -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7
30 -15z m800 0 c26 -32 -13 -81 -47 -59 -35 22 -23 74 17 74 10 0 23 -7 30
-15z"/>
<path d="M202 787 l3 -653 27 -41 c15 -22 44 -51 65 -64 l38 -24 666 0 665 0
41 27 c22 15 51 44 64 65 l24 38 3 653 3 652 -141 0 -140 0 0 -40 0 -40 100 0
100 0 -2 -605 -3 -605 -33 -32 -32 -33 -650 0 -650 0 -32 33 -33 32 -3 605 -2
605 100 0 100 0 0 40 0 40 -140 0 -141 0 3 -653z"/>
<path d="M720 1400 l0 -40 280 0 280 0 0 40 0 40 -280 0 -280 0 0 -40z"/>
</g>
</svg>
`;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartItems: any[] = [];
  customerName: string = '';
  customerEmail: string = '';
  customerAddress: string = '';
  customerPhone: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
    if (!this.authService.isLoggedIn()) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  placeOrder(): void {
    // Gọi phương thức setCustomerInfo từ OrderService và truyền thông tin thanh toán
    this.orderService.setCustomerInfo(
      this.customerName,
      this.customerEmail,
      this.customerAddress,
      this.customerPhone
    );
    // Gọi phương thức placeOrder từ OrderService
    this.orderService.placeOrder();
  }
  get cartTotalPrice(): number {
    return this.cartService.getCartTotalPrice();
  }
}
