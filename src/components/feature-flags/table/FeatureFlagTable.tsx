import { Box, Table } from '@chakra-ui/react';
import { Environment, FeatureFlag } from '@avocet/core';
import FeatureFlagTableRow from './FeatureFlagTableRow';
import Loader from '#/components/helpers/Loader';
import ErrorBox from '#/components/helpers/ErrorBox';
import { useAllEnvironments, useAllFeatureFlags } from '#/hooks/query-hooks';

export default function FeatureFlagTable() {
  const flagsQuery = useAllFeatureFlags();
  const environmentsQuery = useAllEnvironments();

  if (flagsQuery.isPending) return <Loader />;
  if (flagsQuery.isError) return <ErrorBox error={flagsQuery.error} />;

  const featureFlags: FeatureFlag[] = flagsQuery.data;
  const allEnvironments: Environment[] = environmentsQuery.data ?? [];

  const pinnedEnvironments = allEnvironments.filter((env) => env.pinToLists);

  if (featureFlags.length === 0)
    return (
      <ErrorBox
        error={new Error('No feature flags found. Please create one.')}
      />
    );

  return (
    <Box borderRadius="5px" overflow="hidden">
      <Table.Root className="table">
        <Table.Header>
          <Table.Row bg="avocet-section">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Default Value</Table.ColumnHeader>
            {pinnedEnvironments.map((env) => (
              <Table.ColumnHeader key={`${env.name}-header`}>
                {env.name.charAt(0).toUpperCase() + env.name.slice(1)}
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader>Override Rules</Table.ColumnHeader>
            <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {featureFlags.map((flag) => (
            <FeatureFlagTableRow
              key={flag.id}
              allEnvironmentNames={pinnedEnvironments.map((env) => env.name)}
              flag={flag}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
