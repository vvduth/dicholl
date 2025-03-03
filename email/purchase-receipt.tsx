import { Order } from "@/types";
import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { formatCurrency, formatDate } from "@/lib/utils";
import sampleData from "@/db/sample-data";
require("dotenv").config();
PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: "123",
    user: {
      name: "John Doe",
      email: "test@test.com",
    },
    paymentMethod: "Stripe",
    shippingAddress: {
      fullName: "John Doe",
      streetAddress: "123 Main st",
      city: "New York",
      postalCode: "10001",
      country: "US",
    },
    createdAt: new Date(),
    totalPrice: "100",
    taxPrice: "10",
    shippingPrice: "10",
    itemsPrice: "80",
    orderitems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: "123",
      productId: "123",
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: "123",
      status: "succeeded",
      pricePaid: "100",
      email_address: "test@test.com",
    },
  },
} satisfies OrderInformationProps;

type OrderInformationProps = {
  order: Order;
};
export default function PurchaseReceiptEmail({ order }: { order: Order }) {
  return (
    <Html>
      <Preview>View Order Receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text
                    className="mb-0 mr-4 text-gray-500 
                                 whitespace-nowrap text-nowrap"
                  >
                    Order ID
                  </Text>
                  <Text className="mt-0 mr-4">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text
                    className="mb-0 mr-4 text-gray-500 
                                 whitespace-nowrap text-nowrap"
                  >
                    Date
                  </Text>
                  <Text className="mt-0 mr-4">
                    {formatDate(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text
                    className="mb-0 mr-4 text-gray-500 
                                 whitespace-nowrap text-nowrap"
                  >
                    Price
                  </Text>
                  <Text className="mt-0 mr-4">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section
              className="border border-solid border-gray-500 rounded-lg
                    p-4 md:p-6"
            >
              {order.orderitems.map((item) => (
                <Row key={item.productId} className="mt-8">
                  <Column className="w-20">
                    <Img
                      width={80}
                      height={80}
                      src={
                        item.image.startsWith("/")
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                      alt={item.name}
                    />
                  </Column>
                  <Column className="align-top">
                    {item.name} x {item.qty}
                  </Column>
                  <Column align="right" className="align-top">
                    {formatCurrency(item.price)}
                  </Column>
                </Row>
              ))}
              {[
                { name: "item", price: order.itemsPrice },
                { name: "Taxs", price: order.taxPrice },
                { name: "Shipping", price: order.shippingPrice },
                { name: "Total", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}:</Column>
                  <Column align="right" width={70} className="alight-top">
                    <Text className="m-0">{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
