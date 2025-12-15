import { gql } from '@apollo/client';

export const GET_SHIPMENTS = gql`
  query GetShipments($skip: Int!, $take: Int!, $status: String) {
    shipments(skip: $skip, take: $take, status: $status) {
      id
      trackingId
      status
      origin
      destination
      estimatedDelivery
    }
  }
`;

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(createShipmentInput: $input) {
      id
      trackingId
      status
      origin
      destination
      estimatedDelivery
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($input: UpdateShipmentInput!) {
    updateShipment(updateShipmentInput: $input) {
      id
      status
      origin
      destination
      estimatedDelivery
    }
  }
`;