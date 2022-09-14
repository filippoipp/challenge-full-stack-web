import crypto from 'crypto';

import Joi from '@hapi/joi';
import { getMockReq, getMockRes } from '@jest-mock/express';

import HttpError from '../errors/http-error';
import {
  validateBody, validateParams, validateQuery, validateRequest,
} from './validation';

const keycloakRequest = Joi.object({
  keycloakTokenModel: Joi.object({
    idAccount: Joi.string().required(),
  }).required(),
});

const anyParams = Joi.object({
  idAccount: Joi.string().required(),
});

const anyBody = Joi.object({
  idAccount: Joi.string().required(),
});

const fakeValue = () => crypto.randomBytes(32).toString('hex');

describe('Test validation middleware', () => {
  test('Should call next with error when called validateRequest with object empty', async () => {
    const mockRequest = getMockReq({
      keycloakTokenModel: {},
    });

    const httpError = new HttpError(422, 'SERVER-422', 'Validation error', [
      { idAccount: 'keycloakTokenModel.idAccount is required' },
    ]);

    const { res, next } = getMockRes();

    const middleware = validateRequest(keycloakRequest);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(httpError);
  });

  test('Should call next with error when called validateRequest with object undefined', async () => {
    const mockRequest = getMockReq({
      keycloakTokenModel: undefined,
    });

    const httpError = new HttpError(422, 'SERVER-422', 'Validation error', [
      { idAccount: 'keycloakTokenModel is required' },
    ]);

    const { res, next } = getMockRes();

    const middleware = validateRequest(keycloakRequest);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(httpError);
  });

  test('Should call next with empty when called validateRequest with object valid', async () => {
    const mockRequest = getMockReq({
      keycloakTokenModel: {
        idAccount: fakeValue(),
      },
    });

    const { res, next } = getMockRes();

    const middleware = validateRequest(keycloakRequest);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('Should call next with error when called validateParams with object empty', async () => {
    const mockRequest = getMockReq({
      params: {},
    });

    const httpError = new HttpError(422, 'SERVER-422', 'Validation error', [
      { idAccount: 'idAccount is required' },
    ]);

    const { res, next } = getMockRes();

    const middleware = validateParams(anyParams);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(httpError);
  });

  test('Should call next with empty when called validateParams with object valid', async () => {
    const mockRequest = getMockReq({
      params: {
        idAccount: fakeValue(),
      },
    });

    const { res, next } = getMockRes();

    const middleware = validateParams(anyParams);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('Should call next with error when called validateQuery with object empty', async () => {
    const mockRequest = getMockReq({
      query: {},
    });

    const httpError = new HttpError(422, 'SERVER-422', 'Validation error', [
      { idAccount: 'idAccount is required' },
    ]);

    const { res, next } = getMockRes();

    const middleware = validateQuery(anyParams);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(httpError);
  });

  test('Should call next with empty when called validateQuery with object valid', async () => {
    const mockRequest = getMockReq({
      query: {
        idAccount: fakeValue(),
      },
    });

    const { res, next } = getMockRes();

    const middleware = validateQuery(anyParams);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('Should call next with error when called validateBody with object empty', async () => {
    const mockRequest = getMockReq({
      body: {},
    });

    const httpError = new HttpError(422, 'SERVER-422', 'Validation error', [
      { idAccount: 'idAccount is required' },
    ]);

    const { res, next } = getMockRes();

    const middleware = validateBody(anyBody);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(httpError);
  });

  test('Should call next with empty when called validateBody with object valid', async () => {
    const mockRequest = getMockReq({
      body: {
        idAccount: fakeValue(),
      },
    });

    const { res, next } = getMockRes();

    const middleware = validateBody(anyBody);
    await middleware(mockRequest, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
