package main

import (
  "google.golang.org/grpc"
  "os"

  "github.com/labstack/echo"
  "github.com/labstack/echo/middleware"
  "github.com/stripe/stripe-go"
  "github.com/stripe/stripe-go/checkout/session"
)
// This example sets up an endpoint using the Echo framework.
// Watch this video to get started: https://youtu.be/ePmEVBu8w6Y.

func main() {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

  e := echo.New()
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())

  e.POST("/create-checkout-session", createCheckoutSession)

  e.Logger.Fatal(e.Start("localhost:4242"))
}

type CreateCheckoutSessionResponse struct {
  SessionID string `json:"id"`
}

func createCheckoutSession(c echo.Context) (err error) {
  params := &stripe.CheckoutSessionParams{
    PaymentMethodTypes: stripe.StringSlice([]string{
      "card",
    }),
    Mode: stripe.String("payment"),
    LineItems: []*stripe.CheckoutSessionLineItemParams{
      &stripe.CheckoutSessionLineItemParams{
        PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
          Currency: stripe.String("usd"),
          ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
            Name: stripe.String("T-shirt"),
          },
          UnitAmount: stripe.Int64(2000),
        },
        Quantity: stripe.Int64(1),
      },
    },
    SuccessURL: stripe.String("https://example.com/success"),
    CancelURL:  stripe.String("https://example.com/cancel"),
  }

  session, _ := session.New(params)

  if err != nil {
    return err
  }

  data := CreateCheckoutSessionResponse{
    SessionID: session.ID,
  }

  return c.JSON(http.StatusOK, data)
}