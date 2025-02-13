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
    getAuthorized(context, 'Blog Topic | Blog Management | Admin Panel | Tripo', cookies => {
        return null;
    });

const Page = () => {
    const router = useRouter();

    return (
        <Card title="" subTitle="">
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'Blog Topic'}
                        title={'Blog Topics'}
                        subtitle={'Manage blog topics here!'}
                        viewAll={{
                            uri: `/api/v1/blog-topics`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/blog-topics`,
                        }}
                        viewOne={{ uri: '/api/v1/blog-topics/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/blog-topics/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/blog-topics/{id}',
                            identifier: '{id}',
                        }}
                        customActions={[]}
                        fields={[
                            {
                                type: 'text',
                                name: 'thumbnailUrl',
                                placeholder: 'Enter topic thumbnail URL!',
                                title: 'Thumbnail Url',
                                initialValue: null,
                                // validate: (values: any) => {
                                //     if (!values.thumbnailUrl) return 'Required!';

                                //     return null;
                                // },
                            },
                            {
                                type: 'text',
                                name: 'bannerUrl',
                                placeholder: 'Enter topic banner URL!',
                                title: 'Banner Url',
                                initialValue: null,
                                // validate: (values: any) => {
                                //     if (!values.bannerUrl) return 'Required!';

                                //     return null;
                                // },
                            },
                            {
                                type: 'text',
                                name: 'name',
                                placeholder: 'Enter topic name!',
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
