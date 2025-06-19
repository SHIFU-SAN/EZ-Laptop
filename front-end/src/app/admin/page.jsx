"use client";
"use strict";

import {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {BsGpuCard} from "react-icons/bs";
import {
    MdAddCircle,
    MdAssignmentTurnedIn,
    MdCreate,
    MdDelete,
    MdEdit,
    MdUploadFile,
    MdLogout,
    MdLaptop,
    MdManageSearch,
    MdPerson,
    MdVisibility
} from "react-icons/md";
import {FiCpu} from "react-icons/fi";

import Logo from "../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function SearchBar({className, children}) {
    return <div className={" " + className}>
        {children}
    </div>
}

function TabHeader({onClick, className, children, isDisabled}) {
    return <li onClick={onClick}
               className={"md:min-w-[160px] lg:min-w-[200px] border-t-2 md:border-t-0 md:border-b-2 border-r-2 md:border-r-0 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg px-2 md:px-4 lg:px-8 py-1 md:py-4 flex items-center gap-1 " + className}
               disabled={isDisabled}>{children}</li>
}

function TabMain({children, className}) {
    return <main
        className={"w-full p-2 md:p-4 rounded-tr-lg md:rounded-tl-lg rounded-b-lg bg-white " + className}>{children}</main>
}

function AccountSection({className, children, roles, user_data}) {
    const [avatar, setAvatar] = useState(user_data?.Avatar);
    const [roleID, setRoleID] = useState(user_data?.Role?._id);
    const [user, setUser] = useState(user_data);

    async function updatePermission(user_id, role_id) {
        try {
            await fetch(`${BASE_API}/account/info`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    UserID: user_id,
                    Role: role_id
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setRoleID(data.Role?._id);
                    setUser(data);
                });
        } catch (err) {
            console.error(`Can't update permission! Error: ${err}`);
        }
    }

    return <section className={"outline-1 rounded-lg p-2 flex items-center gap-2 " + className}>
        <div className="relative w-[48px] h-[48px]">
            <Image
                src={BASE_API + avatar}
                alt={user?.Username + "'s avatar"}
                fill={true}
                sizes="(max-width: 768px) 48px, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-full"
            />
        </div>
        <div className="max-w-[100px] md:min-w-1/2">
            <h3 className="font-bold">{user?.Username}</h3>
            <p className="underline overflow-hidden text-ellipsis">{user?.Email}</p>
        </div>
        <select onChange={e => {
            updatePermission(user_data?._id, e.currentTarget.value)
        }} key={roleID} name='Role' id='Role' className="outline-1 rounded-lg md:ml-4 p-1" defaultValue={roleID}>
            {roles.map((role, index) => <option key={index} value={role?._id}
                                                name={role?.Name}>{role?.Name === 'Admin' && "Quản trị viên" || role?.Name === 'User' && "Người dùng"}</option>)}
        </select>
        {children}
    </section>
}

function LaptopSection({className, children, laptop_data}) {
    const imageRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(laptop_data?.Image ? BASE_API + laptop_data?.Image : BASE_API + "/public/images/NoImageAvailable.png");
    const [imageName, setImageName] = useState('');
    const [laptop, setLaptop] = useState(laptop_data);
    const [isReading, setIsReading] = useState(false);

    async function updateLaptop(formData) {
        try {
            // update infos
            const NewName = formData.get('Name');
            const NewCPU = formData.get('CPU');
            const NewGPU = formData.get('GPU');
            const NewRAM = formData.get('RAM');
            const NewSSD = formData.get('SSD');
            const NewScreen = formData.get('Screen');
            const NewPrice = formData.get('Price');

            formData.append('LaptopID', laptop_data?._id);
            if (NewName || NewCPU || NewGPU || NewRAM || NewSSD || NewScreen || NewScreen) {
                await fetch(`${BASE_API}/laptop/info`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        LaptopID: formData.get('LaptopID'),
                        Name: NewName,
                        CPU: NewCPU,
                        GPU: NewGPU,
                        RAM: NewRAM,
                        SSD: NewSSD,
                        Screen: NewScreen,
                        Price: NewPrice
                    }),
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setLaptop(data);
                    });
            }

            // update image
            if (imageRef.current?.files[0]) {
                formData.append('LaptopImage', imageRef.current.files[0]);
                await fetch(`${BASE_API}/laptop/image`, {
                    method: 'PUT',
                    body: formData,
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        setImage(BASE_API + data?.Image);
                        setImageName('');
                    });
            }
            // close window
            setIsEditing(!isEditing);
            alert("Cập nhật thành công. ^-^");
        } catch (err) {
            console.error(`Can't update laptop! Error: ${err.message}`);
        }
    }

    return <section className={"outline-1 rounded-lg p-2 md:p-4 flex flex-col gap-4 " + className}>
        {/*overview*/}
        <div className="flex items-center gap-2">
            <div className="relative min-w-[48px] md:min-w-[60px] size-[48px] md:size-[60px]">
                <Image
                    src={image}
                    alt="Laptop image"
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
            </div>
            <h2 className='w-full font-medium'>{laptop?.Name}</h2>
            <button
                onClick={() => setIsReading(!isReading)}
                className="outline-1 rounded-lg md:ml-4 p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                <MdVisibility/></button>
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                <MdCreate/></button>
            {children}
        </div>
        {
            /*reading*/
            isReading && <ul>
                <li className="flex gap-2"><h4 className='font-medium'>CPU:</h4><p>{laptop?.CPU}</p></li>
                <li className="flex gap-2"><h4 className='font-medium'>GPU:</h4><p>{laptop?.GPU}</p></li>
                <li className="flex items-center gap-2"><h4 className='font-medium'>RAM:</h4><p>{laptop?.RAM}GB</p></li>
                <li className="flex items-center gap-2"><h4 className='font-medium'>SSD:</h4>
                    <p>{laptop?.SSD > 1000 ? laptop?.SSD / 1000 + 'TB' : laptop?.SSD + 'GB'}</p></li>
                <li className="flex gap-2"><h4 className='font-medium'>Màn hình:</h4><p>{laptop?.Screen}</p>
                </li>
                <li className="flex items-center gap-2"><h4 className='font-medium'>Giá:</h4><p
                    className="font-bold text-[#80CBC4]">{new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(laptop?.Price)}</p></li>
            </ul>
        }
        {
            /*editing*/
            isEditing && <div className="flex flex-col gap-4">
                {/*update image*/}
                <div className="flex flex-col gap-2">
                    <label htmlFor='LaptopImage'
                           className="w-max outline-1 rounded-lg bg-[#FFB433] p-2 flex items-center gap-1 cursor-pointer hover:bg-[#80CBC4] hover:text-white active:bg-[#ccc]">Chọn
                        ảnh mới<MdUploadFile/></label>
                    <input onChange={e => setImageName(e.currentTarget?.files[0]?.name)} type='file' id='LaptopImage'
                           name='LaptopImage' ref={imageRef} hidden/>
                    {imageName !== '' && <p className='underline'>{imageName}</p>}
                </div>
                {/*update info*/}
                <form action={updateLaptop} className="outline-1 rounded-lg p-2 pb-8 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='Name' className="md:min-w-[100px] flex items-center gap-1">Tên mới:<MdEdit/></label>
                        <input type='text' id='Name' name='Name' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập tên mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='CPU' className="md:min-w-[100px] flex items-center gap-1">CPU mới:<MdEdit/></label>
                        <input type='text' id='CPU' name='CPU' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập thông tin CPU mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='GPU' className="md:min-w-[100px] flex items-center gap-1">GPU mới:<MdEdit/></label>
                        <input type='text' id='GPU' name='GPU' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập thông tin GPU mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='RAM' className="md:min-w-[244px] flex items-center gap-1">Dung lượng RAM
                            mới (GB):<MdEdit/></label>
                        <input type='number' id='RAM' name='RAM' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập dung lượng RAM mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='SSD' className="md:min-w-[244px] flex items-center gap-1">Dung lượng SSD
                            mới (GB):<MdEdit/></label>
                        <input type='number' id='SSD' name='SSD' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập dung lượng SSD mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='Screen' className="md:min-w-[144px] flex items-center gap-1">Màn hình mới:<MdEdit/></label>
                        <input type='text' id='Screen' name='Screen' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập thông tin màn hình mới ở đây..."/>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label htmlFor='Price' className="md:min-w-[100px] flex items-center gap-1">Giá
                            mới:<MdEdit/></label>
                        <input type='number' id='Price' name='Price' className="w-full outline-1 border-none rounded-lg p-2"
                               placeholder="Nhập giá mới ở đây..."/>
                    </div>
                    <button type='submit'
                            className="w-max outline-1 rounded-lg bg-[#FFB433] px-8 py-2 self-center hover:bg-[#80CBC4] hover:text-[#FBF8EF] active:bg-[#ccc]">Lưu
                    </button>
                </form>
            </div>
        }
    </section>
}

function OrderSection({className, children, order_data}) {
    const [isEditing, setIsEditing] = useState(false);
    const [order, setOrder] = useState(order_data);
    const [isReading, setIsReading] = useState(false);
    const [userAvatar, setUserAvatar] = useState(BASE_API + order_data.User?.Avatar);

    async function updateInfo(formData) {
        try {
            await fetch(`${BASE_API}/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    OrderID: order_data._id,
                    Phone: formData.get('Phone'),
                    Receiver: formData.get('Receiver'),
                    Address: formData.get('Address')
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                    setIsEditing(!isEditing);
                    alert("Cập nhật đơn đặt hàng thành công!");
                });
        } catch (err) {
            console.error(`Can't update order info! Error: ${err.message}`);
        }
    }

    async function updateStatus(e) {
        try {
            await fetch(`${BASE_API}/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    OrderID: order_data._id,
                    Confirm: e.currentTarget.checked.toString()
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setOrder(data));
        } catch (err) {
            console.error(`Can't update status of order! Error: ${err.message}`);
        }
    }

    return <section className={"outline-1 rounded-lg p-2 flex flex-col gap-8 " + className}>
        {/*overview*/}
        <div className="flex items-center gap-2">
            <input
                key={order.Confirm}
                onChange={updateStatus}
                type='checkbox'
                id='Confirmation'
                name='Confirmation'
                defaultChecked={order.Confirm}
            />
            <div className="relative min-w-[48px] md:min-w-[60px] size-[48px] md:size-[60px]">
                <Image
                    src={userAvatar}
                    alt="User avatar"
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
            </div>
            <div className='w-full'>
                <h2 className='font-medium'>{order.User?.Username}</h2>
                <p className="font-bold text-[#80CBC4]">{new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(order.Total)}</p>
            </div>
            {/*buttons*/}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsReading(!isReading)}
                    className="outline-1 rounded-lg md:ml-4 p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                    <MdVisibility/></button>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                    <MdCreate/></button>
                {children}
            </div>
        </div>
        {
            /*Details*/
            isReading && <ul>
                <li className="flex items-center gap-2">
                    <h3 className='font-medium'>Số điện thoại:</h3>
                    <p>{order.Phone}</p>
                </li>
                <li className="flex items-center gap-2">
                    <h3 className='font-medium'>Người nhận:</h3>
                    <p>{order.Receiver}</p>
                </li>
                <li className="flex items-center gap-2">
                    <h3 className='font-medium'>Địa chỉ:</h3>
                    <p>{order.Address}</p>
                </li>
            </ul>
        }
        {
            /*Edit*/
            isEditing && <form action={updateInfo} className="outline-1 rounded-lg p-2 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Phone' className="md:min-w-[172px] flex items-center gap-1">Số điện thoại mới:<MdEdit/></label>
                    <input type='tel' id='Phone' name='Phone' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập số điện thoại mới ở đây..."/>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Receiver' className="min-w-[160px] flex items-center gap-1">Người nhận
                        mới:<MdEdit/></label>
                    <input type='text' id='Receiver' name='Receiver' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập tên người nhận mới ở đây..."/>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Address' className="min-w-[120px] flex items-center gap-1">Địa chỉ mới:<MdEdit/></label>
                    <input type='text' id='Addres' name='Address' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập địa chỉ mới ở đây..."/>
                </div>
                <button type='submit'
                        className="w-max outline-1 rounded-lg px-8 py-2 bg-[#FFB433] font-medium self-center cursor-pointer hover:bg-[#80CBC4] hover:text-[#FBF8EF] active:bg-[#ccc]">Lưu
                </button>
            </form>
        }
    </section>
}

function CreationPart({className, children}) {
    const [isAdding, setIsAdding] = useState(false);
    return <div className={"flex flex-col gap-2 " + className}>
        <button onClick={() => setIsAdding(!isAdding)}
                className="w-max outline-1 rounded-lg px-4 py-2 bg-[#FFB433] flex items-center gap-1 cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
            <MdAddCircle className='text-2xl'/>Thêm
        </button>
        {isAdding &&
            <div className="outline-1 rounded-lg lg:w-1/2 overflow-y-auto p-2 md:p-4 pb-8 flex flex-col gap-4">
                {children}
            </div>}
    </div>
}

function AdminPage() {
    const router = useRouter();

    const navRef = useRef(null);
    const laptopImageRef = useRef(null);

    const [avatar, setAvatar] = useState(`${BASE_API}/public/images/avatars/EmptyAvatar.png`);
    const [isLogout, setIsLogout] = useState(false);
    const [tab, setTab] = useState('AccountTab');
    const [user, setUser] = useState({});
    // state of account tab
    const [roles, setRoles] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    // state of laptop tab
    const [laptops, setLaptops] = useState([]);
    const [searchedLaptops, setSearchedLaptops] = useState([]);
    const [laptopImageName, setLaptopImageName] = useState('');
    //state of order tab
    const [orders, setOrders] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState([]);

    async function createLaptop(formData) {
        try {
            let LaptopID = null;
            await fetch(`${BASE_API}/laptop`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    Name: formData.get('Name'),
                    CPU: formData.get('CPU'),
                    GPU: formData.get('GPU'),
                    RAM: formData.get('RAM'),
                    SSD: formData.get('SSD'),
                    Screen: formData.get('Screen'),
                    Price: formData.get('Price')
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setLaptops([...laptops, data]);
                    setSearchedLaptops([...searchedLaptops, data]);
                    LaptopID = data._id;
                });

            formData.append('LaptopID', LaptopID);
            formData.append('LaptopImage', laptopImageRef.current?.files[0]);
            await fetch(`${BASE_API}/laptop/image`, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setLaptops(laptops.map(laptop => {
                        if (laptop._id === data._id) {
                            laptop.Image = data.Image;
                        }
                        return laptop;
                    }));
                    setLaptopImageName('');
                    alert("Đã thêm laptop. ^-^");
                })
        } catch (err) {
            console.error(`Can't create laptop! Error: ${err}`);
        }
    }

    async function getAllLaptops() {
        try {
            await fetch(`${BASE_API}/laptop/list`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setLaptops(data);
                    setSearchedLaptops(data);
                });
        } catch (err) {
            console.error(`Can't get all laptops! Error: ${err.message}`);
        }
    }

    async function deleteLaptop(id) {
        try {
            await fetch(`${BASE_API}/laptop`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    LaptopID: id
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setLaptops(laptops.filter(laptop => laptop._id !== data._id));
                    setSearchedLaptops(searchedLaptops.filter(laptop => laptop._id !== data._id));
                    alert("Đã xóa laptop!");
                });
        } catch (err) {
            console.error(`Can't delete laptop! Error: ${err}`);
        }
    }

    async function getAllOrders() {
        try {
            await fetch(`${BASE_API}/order/list`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setSearchedOrders(data);
                });
        } catch (err) {
            console.error(`Can't get all orders! Error: ${err}`);
        }
    }

    async function getUserData() {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message || data?.Role?.Name !== 'Admin') {
                        router.replace('/');
                    } else {
                        setUser(data);
                        setAvatar(BASE_API + data?.Avatar);
                    }
                });
        } catch (err) {
            console.error(`Can't get user data! Error: ${err.message}`);
        }
    }

    async function getAllUsers() {
        try {
            await fetch(`${BASE_API}/account`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                    setSearchedUsers(data);
                });
        } catch (err) {
            console.error(`Can't get all users! Error: ${err.message}`);
        }
    }

    async function deleteUser(user_id) {
        try {
            await fetch(`${BASE_API}/account`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    UserID: user_id,
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setUsers(users.filter(user => user?._id !== data?._id));
                    setSearchedUsers(searchedUsers.filter(user => user?._id !== data?._id));
                    alert("Xóa tài khoản thành công!");
                });
        } catch (err) {
            console.error(`Can't delete user! Error: ${err}`);
        }
    }

    async function getAllRoles() {
        try {
            await fetch(`${BASE_API}/role`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setRoles(data));
        } catch (err) {
            console.error(`Can't get all roles! Error: ${err.message}`);
        }
    }

    useEffect(() => {
        getUserData();
        getAllLaptops();
        getAllOrders();
        getAllRoles();
        getAllUsers();
    }, []);

    async function handleLogout() {
        try {
            await fetch(`${BASE_API}/account/logout`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    }
                });
        } catch (err) {
            console.error(`Can't logout! Error: ${err.message}`);
        }
    }

    function onChangeTab(e) {
        const Tabs = navRef.current.children;
        for (let i = 0; i < Tabs.length; i++) {
            if (Tabs[i].classList.contains('bg-white')) {
                Tabs[i].classList.toggle('bg-white');
                Tabs[i].classList.toggle('bg-[#B4EBE6]');
                Tabs[i].classList.toggle('cursor-pointer');
                Tabs[i].classList.toggle('hover:bg-[#80CBC4]');
                Tabs[i].classList.toggle('active:bg-[#FFB433]');
            }
        }

        //remove effect for current tab
        e.currentTarget.classList.toggle('bg-[#B4EBE6]');
        e.currentTarget.classList.toggle('cursor-pointer');
        e.currentTarget.classList.toggle('hover:bg-[#80CBC4]');
        e.currentTarget.classList.toggle('active:bg-[#FFB433]');
        //add new effect for current tab
        e.currentTarget.classList.toggle('bg-white');
    }

    return <div className="min-h-screen bg-[#ccc]/50">
        {/*navigation bar*/}
        <nav className="relative p-2 md:px-4 flex bg-[#80CBC4]">
            <div>
                <Link href="/" className='cursor-pointer'>
                    <Image
                        src={Logo}
                        alt="EZ-Laptop logo"
                        priority={true}
                        className="w-[160px] md:w-[200px] h-auto"
                    />
                </Link>
            </div>
            <div className="absolute right-8 md:right-11 w-[48px] md:w-[60px] h-[48px] md:h-[60px]">
                <Image
                    onClick={() => setIsLogout(!isLogout)}
                    src={avatar}
                    alt={user?.Username + "'s avatar"}
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
                {isLogout && <button
                    onClick={handleLogout}
                    className="absolute top-[52px] md:top-[64px] -right-[24px] md:-right-[24px] w-max outline-1 p-1 bg-[#FBF8EF] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-black hover:text-white active:bg-[#ccc]">Đăng
                    xuất<MdLogout/></button>}
            </div>
        </nav>
        {/*navigation tab*/}
        <div className="mx-2 md:mx-4 mt-2 flex flex-col md:flex-row">
            <ul className="flex md:flex-col gap-2 md:gap-4" ref={navRef}>
                <TabHeader onClick={e => {
                    setTab('AccountTab');
                    onChangeTab(e);
                }} className="md:mt-4 bg-white" isDisabled={tab === 'AccountTab'}><MdPerson
                    className='text-lg md:text-xl'/><h2
                    className="hidden md:inline">Tài khoản</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('CPU_Tab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'CPU_Tab'}><FiCpu
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">CPU</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('GPU_Tab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'GPU_Tab'}><BsGpuCard
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">GPU</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('LaptopTab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'LaptopTab'}><MdLaptop
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">Laptop</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('OrderTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'OrderTab'}><MdAssignmentTurnedIn
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">Đơn hàng</h2></TabHeader>
            </ul>
            {tab === 'AccountTab' && <TabMain className="flex flex-col gap-4 md:gap-8">
                {/*search bar for accounts*/}
                <SearchBar className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor='Username' className='text-4xl'><MdManageSearch/></label>
                        <input onChange={e => {
                            if (e.currentTarget.value !== '') {
                                setSearchedUsers(users.filter(user => user.Username.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
                            } else {
                                setSearchedUsers(users);
                            }
                        }} type='search' id='Username' className="w-full lg:w-1/2 outline-1 border-none rounded-lg p-2"
                               placeholder="Tìm kiếm tên tài khoản?"/>
                    </div>
                </SearchBar>
                {/*Accounts list*/}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2 md:gap-4">
                    {searchedUsers.map((user, index) => <AccountSection key={index} roles={roles}
                                                                        user_data={user}>
                        <button onClick={() => {
                            deleteUser(user?._id)
                        }}
                                className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-red-500 active:bg-[#ccc]">
                            <MdDelete/></button>
                    </AccountSection>)}
                </div>
            </TabMain>}
            {tab === 'CPU_Tab' && <TabMain>Quản lý CPU</TabMain>}
            {tab === 'GPU_Tab' && <TabMain>Quản lý GPU</TabMain>}
            {tab === 'LaptopTab' && <TabMain className="flex flex-col gap-4 md:gap-8">
                <SearchBar>
                    <div className="flex items-center gap-2">
                        <label htmlFor='Username' className='text-4xl'><MdManageSearch/></label>
                        <input onChange={e => {
                            if (e.currentTarget.value !== '') {
                                setSearchedLaptops(laptops.filter(laptop => laptop?.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase())));
                            } else {
                                setSearchedLaptops(laptops);
                            }
                        }} type='search' id='Username' className="w-full lg:w-1/2 outline-1 border-none rounded-lg p-2"
                               placeholder="Tìm kiếm laptop theo tên?"/>
                    </div>
                </SearchBar>
                <CreationPart>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='LaptopImage'
                               className="outline-1 rounded-lg w-max p-2 bg-[#FFB433] flex items-center gap-1 cursor-pointer hover:bg-[#80CBC4] hover:text-white active:bg-[#ccc]">Chọn
                            ảnh laptop<MdUploadFile/></label>
                        <input onChange={e => setLaptopImageName(e.currentTarget?.files[0]?.name)} type='file'
                               id='LaptopImage' name='LaptopImage' ref={laptopImageRef} hidden={true}
                               required/>
                        {laptopImageName !== '' && <p>{laptopImageName}</p>}
                    </div>
                    <form action={createLaptop} className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='Name' className='md:min-w-[80px]'>Tên máy<span
                                className='text-red-500'>*</span>:</label>
                            <input type='text' id='Name' name='Name'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập tên máy ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='CPU' className='md:min-w-[48px]'>CPU<span className='text-red-500'>*</span>:</label>
                            <input type='text' id='CPU' name='CPU'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập thông tin CPU ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='GPU' className='md:min-w-[48px]'>GPU<span className='text-red-500'>*</span>:</label>
                            <input type='text' id='GPU' name='GPU'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập thông tin GPU ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='RAM' className='md:min-w-[196px]'>Dung lượng RAM (GB)<span
                                className='text-red-500'>*</span>:</label>
                            <input type='number' id='RAM' name='RAM'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập dung lượng RAM ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='SSD' className='md:min-w-[192px]'>Dung lượng SSD (GB)<span
                                className='text-red-500'>*</span>:</label>
                            <input type='number' id='SSD' name='SSD'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập dung lượng SSD ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='Screen' className='md:min-w-[92px]'>Màn hình<span
                                className='text-red-500'>*</span>:</label>
                            <input type='text' id='Screen' name='Screen'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập thông tin màn hình ở đây..." required={true}/>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label htmlFor='Price' className='md:min-w-[40px]'>Giá<span
                                className='text-red-500'>*</span>:</label>
                            <input type='number' id='Price' name='Price'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập giá ở đây..." required={true}/>
                        </div>
                        <button type='submit'
                                className="w-max outline-1 rounded-lg px-8 py-2 bg-[#FFB433] self-center cursor-pointer hover:bg-[#80CBC4] hover:text-white active:bg-[#ccc]">Lưu
                        </button>
                    </form>
                </CreationPart>
                <div className="flex flex-col lg:grid grid-cols-3 gap-2 md:gap-4">
                    {searchedLaptops.map((laptop, index) => <LaptopSection key={index} laptop_data={laptop}>
                        <button
                            onClick={() => {
                                deleteLaptop(laptop._id);
                            }}
                            className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-red-500 active:bg-[#ccc]">
                            <MdDelete/></button>
                    </LaptopSection>)}
                </div>
            </TabMain>}
            {tab === 'OrderTab' && <TabMain className="flex flex-col gap-4 md:gap-8">
                <SearchBar>
                    <div className="flex items-center gap-2">
                        <label htmlFor='Username' className='text-4xl'><MdManageSearch/></label>
                        <input
                            onChange={e => setSearchedOrders(orders.filter(order => order?.Phone === e.currentTarget.value))}
                            type='search' id='Username'
                            className="w-full lg:w-1/2 outline-1 border-none rounded-lg p-2"
                            placeholder="Tìm đơn theo số điện thoại?"/>
                    </div>
                </SearchBar>
                {/*Orders list*/}
                <div className="flex flex-col lg:grid grid-cols-3 gap-2 md:gap-4">
                    {searchedOrders.map((order, index) => <OrderSection key={index} order_data={order}>
                        <button
                            className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-red-500 active:bg-[#ccc]">
                            <MdDelete/></button>
                    </OrderSection>)}
                </div>
            </TabMain>}
        </div>
    </div>
}

export default AdminPage;