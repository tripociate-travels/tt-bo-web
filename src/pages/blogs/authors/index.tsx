import React, { useMemo } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../../libs/auth';
import GenericViewGenerator from '../../../components/global/GenericViewGenerator';
import { getGeneralStatusOptions } from '../../../utils';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Blog Author | Blog Management | Admin Panel | Tripo', cookies => {
        return null;
    });

const Page = () => {
    const router = useRouter();

    return (
        <Card title="" subTitle="">
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'Blog Author'}
                        title={'Blog Authors'}
                        subtitle={'Manage blog authors here!'}
                        viewAll={{
                            uri: `/api/v1/blog-authors`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/blog-authors`,
                        }}
                        viewOne={{ uri: '/api/v1/blog-authors/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/blog-authors/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/blog-authors/{id}',
                            identifier: '{id}',
                        }}
                        customActions={[]}
                        fields={[
                            {
                                type: 'text',
                                name: 'name',
                                placeholder: 'Enter author name!',
                                title: 'Name',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.name) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'number',
                                name: 'serial',
                                placeholder: 'Enter a serial!',
                                title: 'Serial',
                                initialValue: 9999,
                                validate: (values: any) => {
                                    if (!values.serial) return 'Serial required!';

                                    return null;
                                },
                            },
                            {
                                type: 'select-sync',
                                name: 'status',
                                placeholder: 'Select a status!',
                                title: 'Status',
                                initialValue: 'ACTIVE',
                                options: getGeneralStatusOptions(),
                                validate: (values: any) => {
                                    if (!values.status) return 'Status required!';

                                    return null;
                                },
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
