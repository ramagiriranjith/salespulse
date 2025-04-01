import React from 'react'
import Page from "../../components/Page";
import { IconArmchair2, IconCarrot, IconChevronRight, IconFriends } from "@tabler/icons-react";

export default function InventoryDashboardPage() {

    return (
        <Page>
            <h3 className="text-2xl">Inventory Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <iframe title="Inventory Dashboard" width="1100" height="800" src="https://app.powerbi.com/view?r=eyJrIjoiZmNiMWRkNTMtNGVkNi00N2Q5LTk2YzMtMzAyNjVmYWQ4NzVjIiwidCI6IjU4MTQwZmRkLTBiYzUtNGE3Mi1hYjk4LTk2YjRmMzZkYjgzYiJ9" frameborder="0" allowFullScreen="true"></iframe>
            </div>

        </Page>
    )
}
