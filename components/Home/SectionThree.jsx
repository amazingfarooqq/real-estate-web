import React from 'react'
import { GoLocation } from 'react-icons/go';
import Image from 'next/image'


export const SectionThree = () => {
  return (
    <div className='container sectionThree'>
        <div className="row">
            <div className="col-12">
                <h2>Feature property</h2>

                <div className="row">
                    <div className="col fs-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, recusandae!</div>
                    <div className="col-3 text-end">
                      {/* <Link to="/buy"> <button className='btn btn-color px-5'>View All</button> </Link>   */}
                    </div>

                    <div className="col-12 mt-5">

                        <div className="row justify-content-center">

                            <div className="col-11 col-lg-4 p-4">
                            <Image className='w-100' style={{height: '250px'}} src="https://santastellarealestate.com/wp-content/uploads/2014/03/buy550.jpg" alt="img" />

                                <div className="row mt-2">
                                    <div className="col">
                                        <h4 className='m-0 p-0'>Arumba Hill</h4>
                                    </div>
                                    <div className="col text-end">
                                        <h4 className='m-0 p-0'>2312321</h4>
                                    </div>
                                    <div className="col-12 ">
                                        <GoLocation /> Karachi, Pakistan
                                    </div>
                                </div>
                                {/* <Link className='btn btn-color' to="/properyDetails">Read more</Link> */}


                            </div>

                            <div className="col-11 col-lg-4 p-4">
                            <Image className='w-100' style={{height: '250px'}} src="https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1289i215%2Fe0r1htzgy95h4mt6pxv6hr2ev6i215&option=N&h=472&permitphotoenlargement=false" alt="img" />

                                <div className="row mt-2">
                                    <div className="col">
                                        <h4 className='m-0 p-0'>Arumba Hill</h4>
                                    </div>
                                    <div className="col text-end">
                                        <h4 className='m-0 p-0'>2312321</h4>
                                    </div>
                                    <div className="col-12 mb-1">
                                        <GoLocation /> Karachi, Pakistan
                                    </div>
                                </div>
                                {/* <Link className='btn btn-color' to="/properyDetails">Read more</Link> */}


                            </div>

                            <div className="col-11 col-lg-4 p-4">
                            <Image className='w-100' style={{height: '250px'}} src="https://i.pinimg.com/736x/99/a1/03/99a1035bedbdf973a1b0add371570d83.jpg" alt="img" />

                                <div className="row mt-2">
                                    <div className="col">
                                        <h4 className='p-0 m-0'>Arumba Hill</h4>
                                    </div>
                                    <div className="col text-end">
                                        <h4 className='p-0 m-0'>$2312321</h4>
                                    </div>
                                    <div className="col-12 pb-1">
                                        <GoLocation /> Karachi, Pakistan
                                    </div>
                                </div>
                                {/* <Link className='btn btn-color' to="/properyDetails">Read more</Link> */}

                            </div>

                            

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
