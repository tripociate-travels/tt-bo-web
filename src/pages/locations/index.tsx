import React, { useMemo } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import _ from 'lodash';

// application
import { getAuthorized } from '../../libs/auth';
import { getCityById } from '../../apis';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Location Management | Admin Panel | Tripo');

const Page = () => {
    const router = useRouter();

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'Location'}
                        title={'Locations'}
                        subtitle={'Manage locations here!'}
                        viewAll={{
                            uri: `/api/v1/locations`,
                            ignoredColumns: ['createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            onDataModify: (data: any[]) =>
                                _.map(data, datum => ({
                                    id: datum.id,
                                    name: datum.name,
                                    city: datum?.city?.name,
                                    state: datum?.city?.state?.name,
                                    country: datum?.city?.state?.country?.name,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/locations`,
                        }}
                        viewOne={{ uri: '/api/v1/locations/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/locations/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/locations/{id}',
                            identifier: '{id}',
                        }}
                        fields={[
                            {
                                type: 'text',
                                name: 'name',
                                placeholder: 'Enter location name!',
                                title: 'Name',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.name) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'multi-select-sync',
                                name: 'badges',
                                placeholder: 'Select badges!',
                                title: 'Badges',
                                initialValue: null,
                                options: [
                                    { label: 'Featured', value: 'Featured' },
                                    { label: 'Price Drop', value: 'Price Drop' },
                                    { label: 'Fresh Find', value: 'Fresh Find' },
                                    { label: 'Popular', value: 'Popular' },
                                    { label: 'Best Deal', value: 'Beat Deal' },
                                    { label: 'Luxury', value: 'Luxury' },
                                ],
                            },
                        ]}
                    />
                ),
                []
            )}
        </Card>
    );
};

export default Page;
