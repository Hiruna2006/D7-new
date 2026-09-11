"use client";

export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { RoleGuard } from '@/components/role-guard';
import { getMerchOrders, getMerchReceiptUrl, merchandiseService } from '@/src/modules/merchandise/services/merchandise.service';

export default function MerchAdminPage() {
  return (
    <RoleGuard role={['admin', 'superadmin']}>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="heading-serif text-3xl font-black text-white uppercase tracking-tighter">Merch Orders</h1>
            <p className="text-white/40 text-sm">Review and export district official t-shirt orders.</p>
          </div>
          <MerchControls />
        </header>
        <OrdersTable />
      </div>
    </RoleGuard>
  );
}

function MerchControls() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setOrders(await getMerchOrders());
    })();
  }, []);

  const downloadCSV = async () => {
    if (orders.length === 0) return;

    // Requested Format: Date | Name | Email | Club | Color | Qty & Size | Total Rs | Receipt Link
    const headers = ['Date', 'Name', 'Email', 'Club', 'Color', 'Qty & Size', 'Total Rs', 'Receipt Link'];
    const rows: any[] = [];

    for (const o of orders) {
      const blackItems = o.cart?.filter((item: any) => item.productId.includes('black')) || [];
      const whiteItems = o.cart?.filter((item: any) => item.productId.includes('white')) || [];
      const date = o.colomboTime || o.createdAtText || '';

      if (blackItems.length > 0) {
        const summary = blackItems.map((item: any) => `${item.size}(${item.quantity})`).join(', ');
        const subtotal = merchandiseService.calculateTotal(blackItems);
        rows.push([date, o.name, o.email, o.clubName, 'Black', summary, subtotal, o.receiptPath ? await getMerchReceiptUrl(o.receiptPath).catch(() => '') : (o.receiptUrl || '')]);
      }

      if (whiteItems.length > 0) {
        const summary = whiteItems.map((item: any) => `${item.size}(${item.quantity})`).join(', ');
        const subtotal = merchandiseService.calculateTotal(whiteItems);
        rows.push([date, o.name, o.email, o.clubName, 'White', summary, subtotal, o.receiptPath ? await getMerchReceiptUrl(o.receiptPath).catch(() => '') : (o.receiptUrl || '')]);
      }
    }

    const csvContent = [headers, ...rows]
      .map(r => r.map((v: any) => `"${(v || '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `merch_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <button 
      onClick={downloadCSV}
      className="bg-gold text-maroon px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-gold/20 flex items-center gap-3"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
      Export to Excel
    </button>
  );
}

function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setOrders(await getMerchOrders());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-white/20 animate-pulse text-center py-20 font-black uppercase tracking-widest">Loading records...</div>;

  return (
    <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
              <th className="p-6">Date</th>
              <th className="p-6">Member & Club</th>
              <th className="p-6 text-center">Black</th>
              <th className="p-6 text-center">White</th>
              <th className="p-6 text-right">Total</th>
              <th className="p-6 text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => {
              const black = o.cart?.filter((i: any) => i.productId.includes('black')).map((i: any) => `${i.size}(${i.quantity})`).join(', ') || '-';
              const white = o.cart?.filter((i: any) => i.productId.includes('white')).map((i: any) => `${i.size}(${i.quantity})`).join(', ') || '-';
              
              return (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <p className="text-white font-bold text-sm whitespace-nowrap">{o.colomboTime?.split(',')[0] || 'N/A'}</p>
                    <p className="text-white/20 text-[10px] uppercase font-black">{o.colomboTime?.split(',')[1] || ''}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-white font-black uppercase tracking-tight italic">{o.name}</p>
                    <p className="text-blue-400 text-[10px] font-bold uppercase">{o.clubName}</p>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-white/60 text-xs font-mono">{black}</span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-white/60 text-xs font-mono">{white}</span>
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-gold font-black text-lg">Rs. {o.totalAmount}</span>
                  </td>
                  <td className="p-6 text-center">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const url = o.receiptPath ? await getMerchReceiptUrl(o.receiptPath) : o.receiptUrl;
                          if (url) window.open(url, '_blank', 'noopener,noreferrer');
                        } catch (error) {
                          console.error('Unable to open receipt', error);
                        }
                      }}
                      disabled={!o.receiptPath && !o.receiptUrl}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-white/20 hover:bg-gold hover:text-maroon transition-all shadow-lg disabled:opacity-30"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
