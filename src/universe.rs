use wasm_bindgen::prelude::*;
use crate::utils;
use crate::cell::*;
use std::fmt;

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
                let neightbour_col = (column+delta_col) %self.width;

                let index  = self.get_index(neighbour_row, neightbour_col);
                count += self.cells[index] as u8;
            }
        }
        count
    }

    /// get the dead and alive values of the entire universe
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self,cells: &[(u32,u32)]) {
        for (row,col) in cells.iter().cloned(){
            let idx = self.get_index(row,col);
            self.cells[idx] = Cell::Alive;
        }
    }

    /// random generate cells
    fn random_generate_cells(width:u32,height:u32) -> Vec<Cell> {
        (0..width*height).map(|_| {
            let number = js_sys::Math::random();
            if js_sys::Math::random() < number {
                Cell::Alive
            } else {
                Cell::Dead
            }
        }).collect()
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
                    // Rule 3 : any live cell with more than three live neighbours will die
                    (Cell::Alive,x) if x > 3 => Cell::Dead,
                    // Rule 4 : any dead cell with 3 live neighbours will live
                    (Cell::Dead,3) => Cell::Alive,
                    // All other cells will remain the same state
                    (otherwise,_) => otherwise,
                };

                //log!("    it becomes {:?}", next_cell);
                next[index] = next_cell;
            }
        }

        self.cells = next;
    }


    /// 新建
    pub fn new() -> Universe {
        // enable logging for panics
        utils::set_panic_hook();

        let width = 64;
        let height  = 64;

        let cells = Universe::random_generate_cells(width, height);

        log!("create a new universe which is {} * {}",width,height);
        Universe { width: width, height: height, cells: cells }        
    }
   
    /// 随机生成cells
    pub fn refresh(&mut self) {
        self.cells = Universe::random_generate_cells(self.width,self.height);
    }

    /// 将所有cell的状态全部置为dead
    pub fn clear(&mut self){
        self.cells = (0..self.height * self.width).map(|_| Cell::Dead).collect();
    }

    /// render the universe
    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self,width:u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_| Cell::Dead).collect();
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self,height: u32) {
        self.height = height;
        self.cells = (0..height * self.width).map(|_| Cell::Dead).collect();
    }

    pub fn cells(&self) -> *const Cell{
        self.cells.as_ptr()
    }

    pub fn toggle_cell(&mut self,row: u32,column:u32){
        let idx = self.get_index(row,column);
        self.cells[idx].toggle();
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