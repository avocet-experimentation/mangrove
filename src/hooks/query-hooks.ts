import {
  ALL_ENVIRONMENTS,
  ALL_FEATURE_FLAGS,
  FEATURE_FLAG,
  getRequestFunc,
  gqlRequest,
} from '#/lib/graphql-queries';
import TelemetryService from '#/services/TelemetryService';
import { Environment } from '@avocet/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '#/lib/UseAuth';

export const useGetAccessToken = () => {
  const { getAccessTokenSilently } = useAuth();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
        setAccessToken(''); // Set to null or handle errors appropriately
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  return accessToken;
};

export const useAllFeatureFlags = () =>
  useQuery({
    queryKey: ['allFeatureFlags'],
    queryFn: async () => gqlRequest(ALL_FEATURE_FLAGS, {}),
  });

export const useFeatureFlag = (flagId: string) =>
  useQuery({
    queryKey: ['featureFlag', flagId],
    queryFn: async () => gqlRequest(FEATURE_FLAG, { id: flagId }),
  });

export const useAllEnvironments = () =>
  useQuery({
    queryKey: ['allEnvironments'],
    queryFn: getRequestFunc(ALL_ENVIRONMENTS, {}),
    placeholderData: [] as Environment[],
  });

export const useAllTelemetry = () => {
  const telemetryService = new TelemetryService();
  return useQuery({
    queryKey: ['allTelemetry'],
    queryFn: async () => {
      const response = await telemetryService.getMany();
      if (!response.ok) return [];
      return response.body;
    },
  });
};

export const useAllTelemetryTypes = () => {
  const telemetryService = new TelemetryService();
  return useQuery({
    queryKey: ['allTelemetryTypes'],
    queryFn: async () => {
      const response = await telemetryService.getAllSpanTypes();
      if (!response.ok) return [];
      return response.body;
    },
  });
};
