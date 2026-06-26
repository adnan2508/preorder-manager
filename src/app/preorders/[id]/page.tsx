import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";
import PreorderForm from "@/components/preorder/preorder-form";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPreorderPage({ params }: Props) {
    const { id } = await params;

    const preorder = await prisma.preorder.findUnique({
        where: {
            id,
        },
    });

    if (!preorder) {
        notFound();
    }

    return (
        <Container>
            <PageHeading title="Update Preorder" />

            <PreorderForm
                preorder={{
                    ...preorder,
                    startsAt: preorder.startsAt.toISOString().slice(0, 16),
                    endsAt: preorder.endsAt
                        ? preorder.endsAt.toISOString().slice(0, 16)
                        : "",
                }}
            />
        </Container>
    );
}