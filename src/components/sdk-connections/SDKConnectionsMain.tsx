import { Flex, Heading, Text } from '@chakra-ui/react';
import { Environment, SDKConnection } from '@avocet/core';
import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '#/services/ServiceContext';
import SDKConnectionTable from './table/SDKConnectionTable';
import SDKConnectionManagementModal from './management-form/SDKConnectionManagementModal';

/**
 * Parent component for Connections
 */
export default function SDKConnectionsMain() {
  const [sdkConnections, setSDKConnections] = useState<SDKConnection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { environment } = useContext(ServicesContext);

  const updateSDKConnection = (obj: SDKConnection) => {
    setSDKConnections((prevState) => {
      const index = prevState.find((el) => el.id === obj.id);
      if (index) {
        return prevState.map((el) => (el.id === obj.id ? obj : el));
      }
      return [...prevState, obj];
    });
  };

  useEffect(() => {
    const getAllSDKConnections = async () => {
      try {
        // const response = await environment.getMany();
        const response = {};
        const allSDKConnections = response.body ?? [];
        setSDKConnections(allSDKConnections);
      } catch (error) {
        console.log(error);
      }
    };

    getAllSDKConnections();
  }, []);

  return (
    <Flex direction="column" padding="25px" height="100vh" overflowY="scroll">
      <Flex
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="3xl">Connections</Heading>
        <SDKConnectionManagementModal
          setIsLoading={setIsLoading}
          updateSDKConnection={updateSDKConnection}
        />
      </Flex>
      <Text margin="15px 0">
        Defining multiple environments allows for feature flags to behave
        differently in each environment.
      </Text>
      {sdkConnections.length ? (
        <SDKConnectionTable
          environments={sdkConnections}
          updateEnvironment={updateSDKConnection}
          setIsLoading={setIsLoading}
        />
      ) : (
        'No connections found. Please create one.'
      )}
    </Flex>
  );
}
