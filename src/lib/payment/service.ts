export interface PaymentCheckoutSession {
  sessionId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'created' | 'completed' | 'failed';
  paymentMethod: string;
}

export interface PaymentProvider {
  createCheckoutSession: (orderId: string, amount: number, customerName: string) => Promise<PaymentCheckoutSession>;
  verifyPayment: (sessionId: string) => Promise<boolean>;
}

class MockPaymentProvider implements PaymentProvider {
  async createCheckoutSession(orderId: string, amount: number, customerName: string): Promise<PaymentCheckoutSession> {
    // Simulate server-side payment token generation (Stripe / Razorpay pattern)
    const sessionId = `pay_sess_${Math.random().toString(36).substring(2, 12)}`;
    return {
      sessionId,
      orderId,
      amount,
      currency: 'INR',
      status: 'created',
      paymentMethod: 'Online Payment (UPI/Card)',
    };
  }

  async verifyPayment(sessionId: string): Promise<boolean> {
    // Simulate payment gateway webhook verification
    return sessionId.startsWith('pay_sess_');
  }
}

export const paymentProvider: PaymentProvider = new MockPaymentProvider();
