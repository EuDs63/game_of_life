mod utils;

use std::fmt;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}",name));
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone,Copy,Debug,PartialEq,Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells : Vec<Cell>,
}

impl Universe {
    /// access the cell at a given row and column
    fn get_index(&self,row:u32,column: u32) -> usize{
        (row * self.width + column) as usize
    }

    ///  get a count of how many of its neighbors are alive
    fn live_neighbour_count(&self,row:u32,column: u32) -> u8{
        let mut count = 0;
        for delta_row in [self.height-1,0,1].iter().cloned(){
            for delta_col in [self.width-1,0,1].iter().cloned(){
                if delta_row == 0 && delta_col == 0{
                    continue; // 跳过自身
                }

                let neighbour_row = (row + delta_row) % self.height;
                let neightbour_col = (column+delta_row) %self.width;

                let index  = self.get_index(neighbour_row, neightbour_col);
                count += self.cells[index] as u8;
            }
        }
        count
    }
}

/// public methods,exported to JavaScript
#[wasm_bindgen]
impl Universe {
    /// 得到下一次tick的状态
    pub fn tick(&mut self){
        let mut next = self.cells.clone();

        for row in 0..self.height{
            for column in 0..self.width{
                let index = self.get_index(row,column);
                let cell = self.cells[index];
                let live_neighbours = self.live_neighbour_count(row, column);

                let next_cell = match (cell,live_neighbours) {
                    // Rule 1 : any live cell with fewer than 2 live neighbours will die
                    (Cell::Alive,x) if x < 2 => Cell::Dead,
                    // Rule 2 : any live cell with 2 or 3 live neighbours will live
                    (Cell::Alive, x) if (x == 2 || x == 3) => Cell::Alive,
                    // Rule 3 : any dead cell with 3 live neighbours will live
                    (Cell::Dead,3) => Cell::Alive,
                    // All other cells will remain the same state
                    (otherwise,_) => otherwise,
                };
                next[index] = next_cell;
            }
        }

        self.cells = next;
    }

    /// 新建
    pub fn new() -> Universe {
        let width = 64;
        let height  = 64;

        let cells = (0..width*height).map(|i| {
            if i % 2 == 0 || i% 7 == 0{
                Cell::Alive
            }else {
                Cell::Dead
            }
        }).collect();

        Universe { width: width, height: height, cells: cells }        
    }
    /// render the universe
    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl  fmt::Display for Universe {  
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line{
                let symbol = if cell == Cell::Dead { '◻' } else {'◼' };
                write!(f,"{}",symbol)?;
            }
            write!(f,"\n")?;
        }
        Ok(())
    }   
}