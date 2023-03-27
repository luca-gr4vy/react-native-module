import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { Module, ModuleEvents } = NativeModules;

export interface Gr4vyTransactionResult {
  sucess: boolean;
  transactionId: string;
  status: string;
  paymentMethodId?: string;
}

export interface Gr4vyPaymentMethod {
  id: number;
  method: string;
  mode: string;
}

export interface Gr4vyInterface {
  showPaymentSheet(
    gr4vId: string,
    token: string,
    amount: number,
    currency: string,
    country: string,
    paymentMethodId?: string | null,
    environment?: string | null,
    onError?: (error: string) => void,
    onTransaction?: (transaction: Gr4vyTransactionResult) => void
  ): void;
}

const LINKING_ERROR =
  `The package 'react-native-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const ModuleEventEmitter = new NativeEventEmitter(ModuleEvents);

export default (Module
  ? Module
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    )) as Gr4vyInterface;
